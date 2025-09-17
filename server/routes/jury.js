import { Router } from 'express'
import { auth, role } from '../middlewares/auth.js'
import { listIdeasForJury, submitReview } from '../controllers/juryController.js'

const router = Router()

router.get('/ideas', auth(true), role('judge'), listIdeasForJury)
router.post('/reviews', auth(true), role('judge'), submitReview)

export default router
