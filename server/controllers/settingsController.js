import Settings from '../models/Settings.js'

export async function getSettings(req,res){
  const s = await Settings.findOne().lean()
  res.json(s || {})
}

export async function updateSettings(req,res){
  const payload = req.body || {}
  const s = await Settings.findOneAndUpdate({}, payload, { upsert: true, new: true, setDefaultsOnInsert: true })
  res.json(s)
}
