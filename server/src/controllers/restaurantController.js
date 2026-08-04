import { prisma } from '../config/prisma.js'
import { asyncHandler } from '../middleware/asyncHandler.js'
import { menuItemSchema } from '../validators/index.js'
import { validateBody } from '../middleware/validate.js'

export const listMenu = asyncHandler(async (req, res) => {
  const where = {}
  if (req.query.category) where.category = req.query.category
  const items = await prisma.restaurant.findMany({ where, orderBy: { createdAt: 'desc' } })
  res.json({ success: true, data: items })
})

export const createMenuItem = [
  validateBody(menuItemSchema),
  asyncHandler(async (req, res) => {
    const image = req.body.image || (req.file && req.file.path)
    const item = await prisma.restaurant.create({ data: { ...req.body, image } })
    res.status(201).json({ success: true, data: item })
  }),
]

export const updateMenuItem = [
  validateBody(menuItemSchema.partial()),
  asyncHandler(async (req, res) => {
    const data = { ...req.body }
    if (req.file) data.image = req.file.path
    const item = await prisma.restaurant.update({ where: { id: req.params.id }, data })
    res.json({ success: true, data: item })
  }),
]

export const deleteMenuItem = asyncHandler(async (req, res) => {
  await prisma.restaurant.delete({ where: { id: req.params.id } })
  res.json({ success: true, message: 'Menu item deleted' })
})
