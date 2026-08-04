import { Router } from 'express'
import {
  createBooking,
  listBookings,
  getBooking,
  updateBookingStatus,
  cancelBooking,
} from '../controllers/bookingController.js'
import { protect, restrictTo } from '../middleware/auth.js'

const router = Router()

router.use(protect) // all booking routes require auth

router.post('/', createBooking)
router.get('/', listBookings)
router.get('/:id', getBooking)
router.delete('/:id', cancelBooking)

// Admin
router.put('/:id/status', restrictTo('admin'), updateBookingStatus)

export default router
