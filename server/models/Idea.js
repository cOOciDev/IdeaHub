import mongoose from 'mongoose'
const schema = new mongoose.Schema({
  owner_user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  summary: { type: String, default: '' },
  pdf_path: { type: String, required: true },
  pdf_size: { type: Number, required: true },
  status: { type: String, enum: ['submitted','review','final'], default: 'submitted' }
},{ timestamps: true })
schema.index({ owner_user_id: 1, createdAt: -1 })
export default mongoose.model('Idea', schema)
