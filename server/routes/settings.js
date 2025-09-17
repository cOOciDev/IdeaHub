import { Router } from 'express'
import { auth, role } from '../middlewares/auth.js'
import { getSettings, updateSettings } from '../controllers/settingsController.js'

const router = Router()
router.get('/', getSettings)
router.put('/', auth(true), role('admin'), updateSettings)

export default router
