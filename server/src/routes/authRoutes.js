import { Router } from 'express'
import { register, login, logout, me } from '../controllers/authController.js'
import { validateBody } from '../middleware/validate.js'
import { authSchema } from '../validators/index.js'
import { protect } from '../middleware/auth.js'

const router = Router()

router.post('/register', validateBody(authSchema.register), register)
router.post('/login', validateBody(authSchema.login), login)
router.get('/logout', logout)
router.get('/me', protect, me)

export default router
