import jwt from 'jsonwebtoken'
import Joi from 'joi'
import User from '../models/User.js'

// OTP موک برای توسعه
const OTP_STORE = new Map() // phone -> code

export async function requestOtp(req,res){
  const { error, value } = Joi.object({ phone: Joi.string().required() }).validate(req.body)
  if(error) return res.status(400).json({ error: error.message })
  const { phone } = value
  const code = String(Math.floor(100000 + Math.random()*900000)) // 6 digits
  OTP_STORE.set(phone, code)
  const resp = { ok: true }
  if(process.env.NODE_ENV !== 'production'){
    resp.codePreview = code
  }
  res.json(resp)
}

export async function verifyOtp(req,res){
  const { error, value } = Joi.object({
    phone: Joi.string().required(),
    code: Joi.string().required()
  }).validate(req.body)
  if(error) return res.status(400).json({ error: error.message })
  const { phone, code } = value
  const expected = OTP_STORE.get(phone)
  if(!expected || expected !== code) return res.status(400).json({ error: 'کد نادرست است' })
  OTP_STORE.delete(phone)
  // find or create user
  let user = await User.findOne({ phone })
  if(!user) user = await User.create({ phone, role: 'user' })
  const token = jwt.sign({ sub: user._id, phone, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' })
  res.json({ token, role: user.role })
}
