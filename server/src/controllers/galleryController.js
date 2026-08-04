import { prisma } from '../config/prisma.js'
import { asyncHandler } from '../middleware/asyncHandler.js'
import { gallerySchema } from '../validators/index.js'
import { validateBody } from '../middleware/validate.js'

export const listGallery = asyncHandler(async (req, res) => {
  const where = {}
  if (req.query.category) where.category = req.query.category
  const items = await prisma.gallery.findMany({ where, orderBy: { createdAt: 'desc' } })
  res.json({ success: true, data: items })
})

export const createGallery = [
  validateBody(gallerySchema),
  asyncHandler(async (req, res) => {
    const imageUrl = req.body.imageUrl || (req.file && req.file.path)
    if (!imageUrl) return res.status(400).json({ success: false, message: 'Image is required' })
    const item = await prisma.gallery.create({ data: { ...req.body, imageUrl } })
    res.status(201).json({ success: true, data: item })
  }),
]

export const deleteGallery = asyncHandler(async (req, res) => {
  await prisma.gallery.delete({ where: { id: req.params.id } })
  res.json({ success: true, message: 'Gallery item deleted' })
})
