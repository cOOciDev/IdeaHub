import Joi from 'joi'
import News from '../models/News.js'

function slugify(s){ return (s||'').toString().trim().toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9\-]/g,'') }

export async function createNews(req,res){
  const { error, value } = Joi.object({
    title: Joi.string().required(),
    body: Joi.string().allow(''),
    tags: Joi.array().items(Joi.string()).optional(),
    cover_url: Joi.string().allow('')
  }).validate(req.body)
  if(error) return res.status(400).json({ error: error.message })
  const news = await News.create({
    title: value.title,
    body: value.body || '',
    tags: value.tags || [],
    cover_url: value.cover_url || '',
    slug: slugify(value.title)
  })
  res.status(201).json(news)
}

export async function listNews(req,res){
  const items = await News.find({ published: true }).sort({ createdAt: -1 })
  res.json(items)
}

export async function getNews(req,res){
  const { idOrSlug } = req.params
  const byId = await News.findById(idOrSlug)
  if(byId) return res.json(byId)
  const bySlug = await News.findOne({ slug: idOrSlug })
  if(!bySlug) return res.status(404).json({ error: 'Not found' })
  res.json(bySlug)
}
