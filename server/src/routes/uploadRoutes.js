import { Router } from 'express'
import { uploadImage, uploadImages } from '../controllers/uploadController.js'
import { protect, restrictTo } from '../middleware/auth.js'
import { uploadSingle, uploadMultiple } from '../config/cloudinary.js'

const router = Router()

router.use(protect, restrictTo('admin'))

router.post('/', (req, _res, next) => { req.uploadFolder = 'hotel-hdt/misc'; next() }, uploadSingle, uploadImage)
router.post('/multiple', (req, _res, next) => { req.uploadFolder = 'hotel-hdt/misc'; next() }, uploadMultiple, uploadImages)

export default router
