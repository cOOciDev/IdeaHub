import mongoose from 'mongoose'
const schema = new mongoose.Schema({
  idea_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Idea', required: true },
  judge_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Judge', required: true },
  scores: {
    innovation: { type: Number, min: 0, max: 10, required: true },
    feasibility: { type: Number, min: 0, max: 10, required: true },
    impact: { type: Number, min: 0, max: 10, required: true },
    team: { type: Number, min: 0, max: 10, required: true },
    defense: { type: Number, min: 0, max: 10, required: true }
  },
  weights: {
    innovation: { type: Number, default: 1 },
    feasibility: { type: Number, default: 1 },
    impact: { type: Number, default: 1 },
    team: { type: Number, default: 1 },
    defense: { type: Number, default: 1 }
  },
  total_score: { type: Number, default: 0 },
  comment: String
},{ timestamps: true })
schema.index({ idea_id: 1, judge_id: 1 }, { unique: true })
export default mongoose.model('Review', schema)
