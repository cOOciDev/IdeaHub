import jwt from 'jsonwebtoken'

export function auth(required=true){
  return (req,res,next)=>{
    const header = req.headers.authorization || ''
    const token = header.startsWith('Bearer ') ? header.slice(7) : null
    if(!token){
      if(required) return res.status(401).json({ error: 'Unauthorized' })
      req.user = null; return next()
    }
    try{
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = decoded
      next()
    }catch(e){
      return res.status(401).json({ error: 'Invalid token' })
    }
  }
}

export function role(...roles){
  return (req,res,next)=>{
    if(!req.user || !roles.includes(req.user.role)){
      return res.status(403).json({ error: 'Forbidden' })
    }
    next()
  }
}
