/**
 * Generate a signed JWT token for a given user id.
 */
import jwt from 'jsonwebtoken'

export const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  })
}

/**
 * Cookie options for the auth token.
 */
export const cookieOptions = () => ({
  httpOnly: true,
  secure: process.env.COOKIE_SECURE === 'true' || process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
})

/**
 * Calculate number of nights between two dates.
 */
export const calculateNights = (checkIn, checkOut) => {
  const ms = new Date(checkOut).getTime() - new Date(checkIn).getTime()
  return Math.max(1, Math.ceil(ms / (1000 * 60 * 60 * 24)))
}

/**
 * Slugify a string.
 */
export const slugify = (str) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')

/**
 * Parse JSON string field safely (for Prisma SQLite which stores arrays as strings).
 */
export const parseJsonField = (val) => {
  if (!val) return []
  if (Array.isArray(val)) return val
  try {
    return JSON.parse(val)
  } catch {
    return []
  }
}

/**
 * Serialize a single room for the API (parse JSON image/feature arrays).
 */
export const serializeRoom = (room) => ({
  ...room,
  images: parseJsonField(room.images),
  features: parseJsonField(room.features),
})
