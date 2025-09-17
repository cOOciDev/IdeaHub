import { Router } from 'express'
import { auth, role } from '../middlewares/auth.js'
import { uploadPDF } from '../middlewares/upload.js'
import { createIdea, listIdeas, exportIdeasCSV } from '../controllers/ideaController.js'

const router = Router()

router.get('/', auth(true), listIdeas)
router.post('/', auth(true), uploadPDF.single('pdf'), createIdea)
router.get('/export/csv', auth(true), role('admin'), exportIdeasCSV)

export default router
