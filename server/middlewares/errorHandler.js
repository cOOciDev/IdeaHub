export function notFound(req,res,next){
  res.status(404).json({ error: 'Not found' })
}
export function errorHandler(err, req, res, next){
  console.error(err)
  if(err.message && err.message.includes('File too large')){
    return res.status(413).json({ error: 'حجم فایل بیش از ۵۰ مگابایت است.' })
  }
  res.status(500).json({ error: err.message || 'Server error' })
}
