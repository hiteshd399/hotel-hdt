import { Router } from 'express'
import { listEvents, createEvent, updateEvent, deleteEvent } from '../controllers/eventController.js'
import { protect, restrictTo } from '../middleware/auth.js'
import { uploadSingle } from '../config/cloudinary.js'

const router = Router()

router.get('/', listEvents)
router.post('/', protect, restrictTo('admin'), (req, _res, next) => { req.uploadFolder = 'hotel-hdt/events'; next() }, uploadSingle, createEvent)
router.put('/:id', protect, restrictTo('admin'), (req, _res, next) => { req.uploadFolder = 'hotel-hdt/events'; next() }, uploadSingle, updateEvent)
router.delete('/:id', protect, restrictTo('admin'), deleteEvent)

export default router
