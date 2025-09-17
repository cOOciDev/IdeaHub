import Joi from 'joi'
import Review from '../models/Review.js'
import Idea from '../models/Idea.js'
import Settings from '../models/Settings.js'
import Judge from '../models/Judge.js'

export async function listIdeasForJury(req,res){
  const ideas = await Idea.find({}).sort({ createdAt: -1 }).select('title summary pdf_path createdAt')
  res.json(ideas)
}

export async function submitReview(req,res){
  const { error, value } = Joi.object({
    idea_id: Joi.string().required(),
    scores: Joi.object({
      innovation: Joi.number().min(0).max(10).required(),
      feasibility: Joi.number().min(0).max(10).required(),
      impact: Joi.number().min(0).max(10).required(),
      team: Joi.number().min(0).max(10).required(),
      defense: Joi.number().min(0).max(10).required(),
    }).required(),
    comment: Joi.string().allow('')
  }).validate(req.body)
  if(error) return res.status(400).json({ error: error.message })

  const s = await Settings.findOne().lean()
  const w = s?.criteria_weights || { innovation:1, feasibility:1, impact:1, team:1, defense:1 }
  const t = value.scores.innovation*w.innovation + value.scores.feasibility*w.feasibility + value.scores.impact*w.impact + value.scores.team*w.team + value.scores.defense*w.defense

  const judge = await Judge.findOne({ user_id: req.user.sub })
  if(!judge) return res.status(403).json({ error: 'Judge not found' })

  const review = await Review.findOneAndUpdate(
    { idea_id: value.idea_id, judge_id: judge._id },
    { scores: value.scores, weights: w, total_score: t, comment: value.comment||'' },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  )
  res.json(review)
}
