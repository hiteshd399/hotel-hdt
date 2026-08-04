import { Router } from 'express'
import { listOffers, createOffer, updateOffer, deleteOffer } from '../controllers/offerController.js'
import { protect, restrictTo } from '../middleware/auth.js'
import { uploadSingle } from '../config/cloudinary.js'

const router = Router()

router.get('/', listOffers)
router.post('/', protect, restrictTo('admin'), (req, _res, next) => { req.uploadFolder = 'hotel-hdt/offers'; next() }, uploadSingle, createOffer)
router.put('/:id', protect, restrictTo('admin'), (req, _res, next) => { req.uploadFolder = 'hotel-hdt/offers'; next() }, uploadSingle, updateOffer)
router.delete('/:id', protect, restrictTo('admin'), deleteOffer)

export default router
