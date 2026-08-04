import { prisma } from '../config/prisma.js'
import { asyncHandler } from '../middleware/asyncHandler.js'

/**
 * GET /api/stats — admin dashboard statistics
 */
export const getStats = asyncHandler(async (_req, res) => {
  const [
    totalUsers,
    totalRooms,
    totalBookings,
    pendingBookings,
    approvedBookings,
    totalRevenue,
    totalReviews,
    pendingReviews,
    totalMenuItems,
    totalOffers,
    totalEvents,
    totalContacts,
    unresolvedContacts,
    totalGallery,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.room.count(),
    prisma.booking.count(),
    prisma.booking.count({ where: { status: 'pending' } }),
    prisma.booking.count({ where: { status: 'approved' } }),
    prisma.booking.aggregate({ where: { status: { in: ['approved', 'completed'] } }, _sum: { totalPrice: true } }),
    prisma.review.count(),
    prisma.review.count({ where: { approved: false } }),
    prisma.restaurant.count(),
    prisma.offer.count(),
    prisma.event.count(),
    prisma.contact.count(),
    prisma.contact.count({ where: { resolved: false } }),
    prisma.gallery.count(),
  ])

  // Last 7 days booking counts
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6)
  const recentBookings = await prisma.booking.findMany({
    where: { createdAt: { gte: sevenDaysAgo } },
    select: { createdAt: true },
  })

  const chart = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    const dayStr = d.toISOString().slice(0, 10)
    const count = recentBookings.filter((b) => b.createdAt.toISOString().slice(0, 10) === dayStr).length
    chart.push({ date: dayStr, bookings: count })
  }

  res.json({
    success: true,
    data: {
      totalUsers,
      totalRooms,
      totalBookings,
      pendingBookings,
      approvedBookings,
      totalRevenue: totalRevenue._sum.totalPrice || 0,
      totalReviews,
      pendingReviews,
      totalMenuItems,
      totalOffers,
      totalEvents,
      totalContacts,
      unresolvedContacts,
      totalGallery,
      chart,
    },
  })
})
