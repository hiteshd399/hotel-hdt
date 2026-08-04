import { Router } from 'express'
import {
  listReviews,
  createReview,
  approveReview,
  deleteReview,
} from '../controllers/reviewController.js'
import { protect, restrictTo } from '../middleware/auth.js'

const router = Router()

router.get('/', listReviews)
router.post('/', protect, createReview)
router.put('/:id/approve', protect, restrictTo('admin'), approveReview)
router.delete('/:id', protect, deleteReview)

export default router
