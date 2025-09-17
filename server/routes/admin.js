import { Router } from 'express'
import { auth, role } from '../middlewares/auth.js'
import { computeResults } from '../controllers/resultsController.js'

const router = Router()
router.get('/results/compute', auth(true), role('admin'), computeResults)

export default router
