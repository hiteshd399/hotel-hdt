import jwt from 'jsonwebtoken'
import { prisma } from '../config/prisma.js'

/**
 * Protect routes — requires valid JWT in cookie or Authorization header.
 */
export async function protect(req, res, next) {
  try {
    let token = null

    // 1. Cookie
    if (req.cookies?.token) token = req.cookies.token
    // 2. Authorization header
    else if (req.headers.authorization?.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1]
    }

    if (!token) {
      return res.status(401).json({ success: false, message: 'Not authorized, no token provided' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, name: true, email: true, role: true, phone: true, avatar: true },
    })

    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found' })
    }

    req.user = user
    next()
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Not authorized, token failed' })
  }
}

/**
 * Restrict route to specific roles.
 * Usage: router.delete('/room/:id', protect, restrictTo('admin'), controller)
 */
export function restrictTo(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Not authenticated' })
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: 'You do not have permission to perform this action' })
    }
    next()
  }
}
