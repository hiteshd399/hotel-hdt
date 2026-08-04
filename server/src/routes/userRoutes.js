import { Router } from 'express'
import {
  listUsers,
  getUser,
  updateProfile,
  changePassword,
  deleteUser,
  updateRole,
} from '../controllers/userController.js'
import { protect, restrictTo } from '../middleware/auth.js'

const router = Router()

// Authenticated routes for the logged-in user
router.put('/profile', protect, updateProfile)
router.put('/password', protect, changePassword)

// Admin routes
router.get('/', protect, restrictTo('admin'), listUsers)
router.get('/:id', protect, restrictTo('admin'), getUser)
router.delete('/:id', protect, restrictTo('admin'), deleteUser)
router.put('/:id/role', protect, restrictTo('admin'), updateRole)

export default router
