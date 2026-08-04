import { prisma } from '../config/prisma.js'
import { asyncHandler } from '../middleware/asyncHandler.js'
import { eventSchema } from '../validators/index.js'
import { validateBody } from '../middleware/validate.js'

export const listEvents = asyncHandler(async (_req, res) => {
  const events = await prisma.event.findMany({ orderBy: { date: 'asc' } })
  res.json({ success: true, data: events })
})

export const createEvent = [
  validateBody(eventSchema),
  asyncHandler(async (req, res) => {
    const image = req.body.image || (req.file && req.file.path)
    const event = await prisma.event.create({ data: { ...req.body, date: new Date(req.body.date), image } })
    res.status(201).json({ success: true, data: event })
  }),
]

export const updateEvent = [
  validateBody(eventSchema.partial()),
  asyncHandler(async (req, res) => {
    const data = { ...req.body }
    if (req.file) data.image = req.file.path
    if (data.date) data.date = new Date(data.date)
    const event = await prisma.event.update({ where: { id: req.params.id }, data })
    res.json({ success: true, data: event })
  }),
]

export const deleteEvent = asyncHandler(async (req, res) => {
  await prisma.event.delete({ where: { id: req.params.id } })
  res.json({ success: true, message: 'Event deleted' })
})
