import { Router } from 'express'
import { listMenu, createMenuItem, updateMenuItem, deleteMenuItem } from '../controllers/restaurantController.js'
import { protect, restrictTo } from '../middleware/auth.js'
import { uploadSingle } from '../config/cloudinary.js'

const router = Router()

router.get('/', listMenu)
router.post('/', protect, restrictTo('admin'), (req, _res, next) => { req.uploadFolder = 'hotel-hdt/menu'; next() }, uploadSingle, createMenuItem)
router.put('/:id', protect, restrictTo('admin'), (req, _res, next) => { req.uploadFolder = 'hotel-hdt/menu'; next() }, uploadSingle, updateMenuItem)
router.delete('/:id', protect, restrictTo('admin'), deleteMenuItem)

export default router
