import { prisma } from '../config/prisma.js'
import { asyncHandler } from '../middleware/asyncHandler.js'
import { roomSchema } from '../validators/index.js'
import { validateBody } from '../middleware/validate.js'
import { slugify, serializeRoom } from '../utils/helpers.js'

const CATEGORIES = ['Deluxe', 'Superior', 'Executive', 'Suite', 'Presidential Suite']
const SORT_MAP = {
  'price-asc': { price: 'asc' },
  'price-desc': { price: 'desc' },
  'rating-desc': { createdAt: 'desc' },
  'newest': { createdAt: 'desc' },
}

/**
 * GET /api/rooms — public, with search/filter/sort/pagination
 */
export const listRooms = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 12
  const skip = (page - 1) * limit
  const { search, category, minPrice, maxPrice, guests, sort } = req.query

  const where = { AND: [] }
  if (search) {
    where.AND.push({
      OR: [
        { name: { contains: search } },
        { description: { contains: search } },
      ],
    })
  }
  if (category && CATEGORIES.includes(category)) {
    where.AND.push({ category })
  }
  if (minPrice || maxPrice) {
    where.AND.push({
      price: {
        ...(minPrice && { gte: Number(minPrice) }),
        ...(maxPrice && { lte: Number(maxPrice) }),
      },
    })
  }
  if (guests) {
    where.AND.push({ guests: { gte: Number(guests) } })
  }

  const orderBy = SORT_MAP[sort] || { createdAt: 'desc' }

  const [rooms, total] = await Promise.all([
    prisma.room.findMany({ where, skip, take: limit, orderBy }),
    prisma.room.count({ where }),
  ])

  res.json({
    success: true,
    data: rooms.map(serializeRoom),
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
  })
})

/**
 * GET /api/rooms/:slug — public
 */
export const getRoom = asyncHandler(async (req, res) => {
  const room = await prisma.room.findUnique({ where: { slug: req.params.slug } })
  if (!room) return res.status(404).json({ success: false, message: 'Room not found' })

  const reviews = await prisma.review.findMany({
    where: { roomId: room.id, approved: true },
    include: { user: { select: { name: true, avatar: true } } },
    orderBy: { createdAt: 'desc' },
  })

  res.json({ success: true, data: { ...serializeRoom(room), reviews } })
})

/**
 * POST /api/rooms — admin
 */
export const createRoom = [
  validateBody(roomSchema),
  asyncHandler(async (req, res) => {
    const data = { ...req.body }
    data.slug = data.slug ? slugify(data.slug) : slugify(data.name)
    if (data.images) data.images = JSON.stringify(data.images)
    if (data.features) data.features = JSON.stringify(data.features)

    const room = await prisma.room.create({ data })
    res.status(201).json({ success: true, data: serializeRoom(room) })
  }),
]

/**
 * PUT /api/rooms/:id — admin
 */
export const updateRoom = [
  validateBody(roomSchema.partial()),
  asyncHandler(async (req, res) => {
    const data = { ...req.body }
    if (data.slug) data.slug = slugify(data.slug)
    if (data.images) data.images = JSON.stringify(data.images)
    if (data.features) data.features = JSON.stringify(data.features)

    const room = await prisma.room.update({
      where: { id: req.params.id },
      data,
    })
    res.json({ success: true, data: serializeRoom(room) })
  }),
]

/**
 * DELETE /api/rooms/:id — admin
 */
export const deleteRoom = asyncHandler(async (req, res) => {
  await prisma.room.delete({ where: { id: req.params.id } })
  res.json({ success: true, message: 'Room deleted' })
})

/**
 * GET /api/rooms/categories/list — public, returns distinct categories
 */
export const listCategories = asyncHandler(async (_req, res) => {
  res.json({ success: true, data: CATEGORIES })
})
