import { prisma } from '../config/prisma.js'
import { asyncHandler } from '../middleware/asyncHandler.js'
import { contactSchema } from '../validators/index.js'
import { validateBody } from '../middleware/validate.js'
import { sendEmail } from '../config/mailer.js'

export const listContacts = asyncHandler(async (_req, res) => {
  const items = await prisma.contact.findMany({
    orderBy: { createdAt: 'desc' },
    include: { user: { select: { name: true, email: true } } },
  })
  res.json({ success: true, data: items })
})

export const createContact = [
  validateBody(contactSchema),
  asyncHandler(async (req, res) => {
    const data = { ...req.body }
    if (req.user) data.userId = req.user.id

    const contact = await prisma.contact.create({ data })

    // Notify hotel staff
    sendEmail({
      to: process.env.EMAIL_FROM,
      subject: `New Contact Form: ${contact.subject}`,
      html: `<p><b>${contact.name}</b> (${contact.email})</p><p>${contact.message}</p>`,
    }).catch((e) => console.error('[Email] Contact notification failed:', e.message))

    res.status(201).json({ success: true, data: contact })
  }),
]

export const resolveContact = asyncHandler(async (req, res) => {
  const contact = await prisma.contact.update({
    where: { id: req.params.id },
    data: { resolved: true },
  })
  res.json({ success: true, data: contact })
})

export const deleteContact = asyncHandler(async (req, res) => {
  await prisma.contact.delete({ where: { id: req.params.id } })
  res.json({ success: true, message: 'Contact deleted' })
})
