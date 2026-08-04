import { Router } from 'express'
import { listGallery, createGallery, deleteGallery } from '../controllers/galleryController.js'
import { protect, restrictTo } from '../middleware/auth.js'
import { uploadSingle } from '../config/cloudinary.js'

const router = Router()

router.get('/', listGallery)
router.post('/', protect, restrictTo('admin'), (req, _res, next) => { req.uploadFolder = 'hotel-hdt/gallery'; next() }, uploadSingle, createGallery)
router.delete('/:id', protect, restrictTo('admin'), deleteGallery)

export default router
