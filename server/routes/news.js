import { Router } from 'express'
import { auth, role } from '../middlewares/auth.js'
import { createNews, listNews, getNews } from '../controllers/newsController.js'

const router = Router()

router.get('/', listNews)
router.get('/:idOrSlug', getNews)
router.post('/', auth(true), role('admin'), createNews)

export default router
