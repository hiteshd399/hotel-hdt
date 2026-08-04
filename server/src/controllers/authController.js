import bcrypt from 'bcrypt'
import { prisma } from '../config/prisma.js'
import { asyncHandler } from '../middleware/asyncHandler.js'
import { generateToken, cookieOptions } from '../utils/helpers.js'

/**
 * POST /api/auth/register
 */
export const register = asyncHandler(async (req, res) => {
  const { name, email, password, phone } = req.body

  const exists = await prisma.user.findUnique({ where: { email } })
  if (exists) {
    return res.status(409).json({ success: false, message: 'Email already registered' })
  }

  const hashed = await bcrypt.hash(password, 10)
  const user = await prisma.user.create({
    data: { name, email, password: hashed, phone },
    select: { id: true, name: true, email: true, role: true, phone: true },
  })

  const token = generateToken(user.id)
  res.cookie('token', token, cookieOptions())

  res.status(201).json({ success: true, data: user, token })
})

/**
 * POST /api/auth/login
 */
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' })
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' })
  }

  const token = generateToken(user.id)
  res.cookie('token', token, cookieOptions())

  const safe = { id: user.id, name: user.name, email: user.email, role: user.role, phone: user.phone, avatar: user.avatar }
  res.json({ success: true, data: safe, token })
})

/**
 * GET /api/auth/logout
 */
export const logout = asyncHandler(async (req, res) => {
  res.clearCookie('token', cookieOptions())
  res.json({ success: true, message: 'Logged out successfully' })
})

/**
 * GET /api/auth/me — current logged in user
 */
export const me = asyncHandler(async (req, res) => {
  res.json({ success: true, data: req.user })
})
