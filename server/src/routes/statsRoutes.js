import { Router } from 'express'
import { getStats } from '../controllers/statsController.js'
import { protect, restrictTo } from '../middleware/auth.js'

const router = Router()
router.get('/', protect, restrictTo('admin'), getStats)

export default router
