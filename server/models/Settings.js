import mongoose from 'mongoose'
const schema = new mongoose.Schema({
  submission_deadline: Date,
  judging_window: { start: Date, end: Date },
  social_links: { ig: String, wh: String, site: String },
  ga_measurement_id: String,
  criteria_weights: {
    v: { type: Number, default: 1 },
    innovation: { type: Number, default: 1 },
    feasibility: { type: Number, default: 1 },
    impact: { type: Number, default: 1 },
    team: { type: Number, default: 1 },
    defense: { type: Number, default: 1 }
  },
  finalized_results_at: Date
},{ timestamps: true })
export default mongoose.model('Settings', schema)
