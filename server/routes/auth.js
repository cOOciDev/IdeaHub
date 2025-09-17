import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { requestOtp, verifyOtp } from '../controllers/authController.js'

const router = Router()
const otpLimiter = rateLimit({ windowMs: 10*60*1000, max: 8 })

router.post('/request-otp', otpLimiter, requestOtp)
router.post('/verify-otp', verifyOtp)

export default router
