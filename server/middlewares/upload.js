import multer from 'multer'
import path from 'path'
import fs from 'fs'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'uploads/ideas'
    fs.mkdirSync(dir, { recursive: true })
    cb(null, dir)
  },
  filename: (req, file, cb) => {
    const safe = Date.now() + '-' + Math.round(Math.random()*1e9)
    cb(null, safe + '-' + file.originalname.replace(/\s+/g,'_'))
  }
})

export const uploadPDF = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
  fileFilter: (req, file, cb) => {
    if(file.mimetype === 'application/pdf') cb(null, true)
    else cb(new Error('فقط فایل PDF مجاز است.'))
  }
})
