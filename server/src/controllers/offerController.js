import { prisma } from '../config/prisma.js'
import { asyncHandler } from '../middleware/asyncHandler.js'
import { offerSchema } from '../validators/index.js'
import { validateBody } from '../middleware/validate.js'

export const listOffers = asyncHandler(async (_req, res) => {
  const offers = await prisma.offer.findMany({ orderBy: { createdAt: 'desc' } })
  res.json({ success: true, data: offers })
})

export const createOffer = [
  validateBody(offerSchema),
  asyncHandler(async (req, res) => {
    const image = req.body.image || (req.file && req.file.path)
    const offer = await prisma.offer.create({ data: { ...req.body, validFrom: new Date(req.body.validFrom), validTo: new Date(req.body.validTo), image } })
    res.status(201).json({ success: true, data: offer })
  }),
]

export const updateOffer = [
  validateBody(offerSchema.partial()),
  asyncHandler(async (req, res) => {
    const data = { ...req.body }
    if (req.file) data.image = req.file.path
    if (data.validFrom) data.validFrom = new Date(data.validFrom)
    if (data.validTo) data.validTo = new Date(data.validTo)
    const offer = await prisma.offer.update({ where: { id: req.params.id }, data })
    res.json({ success: true, data: offer })
  }),
]

export const deleteOffer = asyncHandler(async (req, res) => {
  await prisma.offer.delete({ where: { id: req.params.id } })
  res.json({ success: true, message: 'Offer deleted' })
})
