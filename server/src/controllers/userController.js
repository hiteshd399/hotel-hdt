import bcrypt from 'bcrypt'
import { prisma } from '../config/prisma.js'
import { asyncHandler } from '../middleware/asyncHandler.js'
import { passwordChangeSchema, userUpdateSchema } from '../validators/index.js'
import { validateBody } from '../middleware/validate.js'

/**
 * GET /api/users — admin only, paginated list
 */
export const listUsers = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 20
  const skip = (page - 1) * limit

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      select: { id: true, name: true, email: true, phone: true, role: true, createdAt: true },
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.user.count(),
  ])

  res.json({
    success: true,
    data: users,
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
  })
})

/**
 * GET /api/users/:id
 */
export const getUser = asyncHandler(async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.params.id },
    select: { id: true, name: true, email: true, phone: true, role: true, avatar: true, address: true, city: true, country: true, createdAt: true },
  })
  if (!user) return res.status(404).json({ success: false, message: 'User not found' })
  res.json({ success: true, data: user })
})

/**
 * PUT /api/users/profile — update own profile
 */
export const updateProfile = [
  validateBody(userUpdateSchema),
  asyncHandler(async (req, res) => {
    const updated = await prisma.user.update({
      where: { id: req.user.id },
      data: req.body,
      select: { id: true, name: true, email: true, phone: true, avatar: true, address: true, city: true, country: true },
    })
    res.json({ success: true, data: updated })
  }),
]

/**
 * PUT /api/users/password — change password
 */
export const changePassword = [
  validateBody(passwordChangeSchema),
  asyncHandler(async (req, res) => {
    const { currentPassword, newPassword } = req.body
    const user = await prisma.user.findUnique({ where: { id: req.user.id } })

    const match = await bcrypt.compare(currentPassword, user.password)
    if (!match) {
      return res.status(400).json({ success: false, message: 'Current password is incorrect' })
    }

    const hashed = await bcrypt.hash(newPassword, 10)
    await prisma.user.update({ where: { id: req.user.id }, data: { password: hashed } })

    res.json({ success: true, message: 'Password updated successfully' })
  }),
]

/**
 * DELETE /api/users/:id — admin only
 */
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.params.id } })
  if (!user) return res.status(404).json({ success: false, message: 'User not found' })
  if (user.role === 'admin') {
    return res.status(400).json({ success: false, message: 'Cannot delete admin user' })
  }

  await prisma.user.delete({ where: { id: req.params.id } })
  res.json({ success: true, message: 'User deleted' })
})

/**
 * PUT /api/users/:id/role — admin only
 */
export const updateRole = asyncHandler(async (req, res) => {
  const { role } = req.body
  if (!['admin', 'customer'].includes(role)) {
    return res.status(400).json({ success: false, message: 'Invalid role' })
  }
  const updated = await prisma.user.update({
    where: { id: req.params.id },
    data: { role },
    select: { id: true, name: true, email: true, role: true },
  })
  res.json({ success: true, data: updated })
})
