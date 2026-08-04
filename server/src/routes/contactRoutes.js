import { Router } from 'express'
import { listContacts, createContact, resolveContact, deleteContact } from '../controllers/contactController.js'
import { protect, restrictTo } from '../middleware/auth.js'

const router = Router()

router.post('/', createContact) // public

router.get('/', protect, restrictTo('admin'), listContacts)
router.put('/:id/resolve', protect, restrictTo('admin'), resolveContact)
router.delete('/:id', protect, restrictTo('admin'), deleteContact)

export default router
