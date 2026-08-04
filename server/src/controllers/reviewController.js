import { prisma } from '../config/prisma.js'
import { asyncHandler } from '../middleware/asyncHandler.js'
import { reviewSchema } from '../validators/index.js'
import { validateBody } from '../middleware/validate.js'

/**
 * GET /api/reviews?roomId=...&approved=true
 */
export const listReviews = asyncHandler(async (req, res) => {
  const where = {}
  if (req.query.roomId) where.roomId = req.query.roomId
  if (req.query.approved === 'true') where.approved = true
  if (req.user?.role !== 'admin' && !req.query.approved) where.approved = true

  const reviews = await prisma.review.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    include: { user: { select: { name: true, avatar: true } }, room: { select: { name: true, slug: true } } },
  })
  res.json({ success: true, data: reviews })
})

/**
 * POST /api/reviews — protected
 */
export const createReview = [
  validateBody(reviewSchema),
  asyncHandler(async (req, res) => {
    const review = await prisma.review.create({
      data: { ...req.body, userId: req.user.id },
      include: { user: { select: { name: true, avatar: true } } },
    })
    res.status(201).json({ success: true, data: review })
  }),
]

/**
 * PUT /api/reviews/:id/approve — admin
 */
export const approveReview = asyncHandler(async (req, res) => {
  const review = await prisma.review.update({
    where: { id: req.params.id },
    data: { approved: true },
  })
  res.json({ success: true, data: review })
})

/**
 * DELETE /api/reviews/:id — owner or admin
 */
export const deleteReview = asyncHandler(async (req, res) => {
  const review = await prisma.review.findUnique({ where: { id: req.params.id } })
  if (!review) return res.status(404).json({ success: false, message: 'Review not found' })

  if (req.user.role !== 'admin' && review.userId !== req.user.id) {
    return res.status(403).json({ success: false, message: 'Not authorized' })
  }
  await prisma.review.delete({ where: { id: req.params.id } })
  res.json({ success: true, message: 'Review deleted' })
})
