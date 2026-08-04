import { prisma } from '../config/prisma.js'
import { asyncHandler } from '../middleware/asyncHandler.js'
import { bookingSchema } from '../validators/index.js'
import { validateBody } from '../middleware/validate.js'
import { calculateNights } from '../utils/helpers.js'
import {
  sendBookingConfirmationEmail,
  sendBookingStatusEmail,
} from '../config/mailer.js'

/**
 * POST /api/bookings — protected (customer)
 */
export const createBooking = [
  validateBody(bookingSchema),
  asyncHandler(async (req, res) => {
    const { roomId, checkIn, checkOut, adults, children, specialRequest } = req.body

    const room = await prisma.room.findUnique({ where: { id: roomId } })
    if (!room) return res.status(404).json({ success: false, message: 'Room not found' })
    if (!room.available) return res.status(400).json({ success: false, message: 'Room not available' })

    const ci = new Date(checkIn)
    const co = new Date(checkOut)
    if (co <= ci) {
      return res.status(400).json({ success: false, message: 'Check-out must be after check-in' })
    }

    // Availability: count overlapping approved/pending bookings
    const overlapping = await prisma.booking.count({
      where: {
        roomId,
        status: { in: ['pending', 'approved'] },
        AND: [
          { checkIn: { lt: co } },
          { checkOut: { gt: ci } },
        ],
      },
    })

    if (overlapping >= room.count) {
      return res.status(409).json({ success: false, message: 'Room is not available for the selected dates' })
    }

    const nights = calculateNights(ci, co)
    const totalPrice = nights * room.price
    const guestsTotal = Number(adults) + Number(children)

    const booking = await prisma.booking.create({
      data: {
        userId: req.user.id,
        roomId,
        checkIn: ci,
        checkOut: co,
        adults: Number(adults),
        children: Number(children),
        nights,
        guestsTotal,
        pricePerNight: room.price,
        totalPrice,
        specialRequest,
      },
      include: { room: true, user: { select: { name: true, email: true } } },
    })

    // Send confirmation email (non-blocking)
    sendBookingConfirmationEmail({
      to: booking.user.email,
      booking,
      room,
    }).catch((e) => console.error('[Email] Booking confirmation failed:', e.message))

    res.status(201).json({ success: true, data: booking })
  }),
]

/**
 * GET /api/bookings — admin: all bookings | customer: own bookings
 */
export const listBookings = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 20
  const skip = (page - 1) * limit
  const status = req.query.status

  const where = {}
  if (req.user.role === 'customer') where.userId = req.user.id
  if (status) where.status = status

  const [bookings, total] = await Promise.all([
    prisma.booking.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        room: true,
        user: { select: { name: true, email: true, phone: true } },
      },
    }),
    prisma.booking.count({ where }),
  ])

  res.json({
    success: true,
    data: bookings,
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
  })
})

/**
 * GET /api/bookings/:id
 */
export const getBooking = asyncHandler(async (req, res) => {
  const booking = await prisma.booking.findUnique({
    where: { id: req.params.id },
    include: { room: true, user: { select: { name: true, email: true, phone: true } } },
  })
  if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' })

  if (req.user.role === 'customer' && booking.userId !== req.user.id) {
    return res.status(403).json({ success: false, message: 'Not authorized' })
  }
  res.json({ success: true, data: booking })
})

/**
 * PUT /api/bookings/:id/status — admin only
 */
export const updateBookingStatus = asyncHandler(async (req, res) => {
  const { status } = req.body
  if (!['pending', 'approved', 'cancelled', 'completed'].includes(status)) {
    return res.status(400).json({ success: false, message: 'Invalid status' })
  }

  const booking = await prisma.booking.update({
    where: { id: req.params.id },
    data: { status },
    include: { room: true, user: { select: { name: true, email: true } } },
  })

  // Notify user by email
  if (['approved', 'cancelled', 'completed'].includes(status)) {
    sendBookingStatusEmail({
      to: booking.user.email,
      booking,
      room: booking.room,
      status,
    }).catch((e) => console.error('[Email] Status update failed:', e.message))
  }

  res.json({ success: true, data: booking })
})

/**
 * DELETE /api/bookings/:id — owner or admin
 */
export const cancelBooking = asyncHandler(async (req, res) => {
  const booking = await prisma.booking.findUnique({ where: { id: req.params.id } })
  if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' })

  if (req.user.role === 'customer' && booking.userId !== req.user.id) {
    return res.status(403).json({ success: false, message: 'Not authorized' })
  }

  const updated = await prisma.booking.update({
    where: { id: req.params.id },
    data: { status: 'cancelled' },
  })
  res.json({ success: true, data: updated })
})
