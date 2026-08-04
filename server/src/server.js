import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import rateLimit from 'express-rate-limit'
import dotenv from 'dotenv'
import morgan from 'morgan'

import { errorHandler, notFound } from './middleware/error.js'
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import roomRoutes from './routes/roomRoutes.js'
import bookingRoutes from './routes/bookingRoutes.js'
import reviewRoutes from './routes/reviewRoutes.js'
import galleryRoutes from './routes/galleryRoutes.js'
import restaurantRoutes from './routes/restaurantRoutes.js'
import offerRoutes from './routes/offerRoutes.js'
import eventRoutes from './routes/eventRoutes.js'
import contactRoutes from './routes/contactRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import statsRoutes from './routes/statsRoutes.js'

dotenv.config()

const app = express()

// ====== Security & core middleware ======
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }))
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
)
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))
app.use(cookieParser())

// Logger
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
}

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500,
  message: { success: false, message: 'Too many requests from this IP, please try again later' },
})
app.use('/api', limiter)

// Stricter rate limit on auth
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  message: { success: false, message: 'Too many auth attempts, please try again later' },
})
app.use('/api/auth', authLimiter)

// Static folder for uploads (fallback if Cloudinary isn't configured)
app.use('/uploads', express.static('uploads'))

// ====== Routes ======
app.get('/', (_req, res) => res.json({ success: true, message: 'Hotel HDT API', status: 'online' }))
app.get('/api/health', (_req, res) => res.json({ success: true, message: 'OK', timestamp: new Date().toISOString() }))

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/rooms', roomRoutes)
app.use('/api/bookings', bookingRoutes)
app.use('/api/reviews', reviewRoutes)
app.use('/api/gallery', galleryRoutes)
app.use('/api/restaurant', restaurantRoutes)
app.use('/api/offers', offerRoutes)
app.use('/api/events', eventRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/stats', statsRoutes)

// ====== Error handlers ======
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`✨ Hotel HDT API running on port ${PORT}`)
})

export default app
