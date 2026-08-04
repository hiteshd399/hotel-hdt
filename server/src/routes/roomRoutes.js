import { Router } from 'express'
import {
  listRooms,
  getRoom,
  createRoom,
  updateRoom,
  deleteRoom,
  listCategories,
} from '../controllers/roomController.js'
import { protect, restrictTo } from '../middleware/auth.js'

const router = Router()

// Public
router.get('/', listRooms)
router.get('/categories/list', listCategories)
router.get('/:slug', getRoom)

// Admin
router.post('/', protect, restrictTo('admin'), createRoom)
router.put('/:id', protect, restrictTo('admin'), updateRoom)
router.delete('/:id', protect, restrictTo('admin'), deleteRoom)

export default router
