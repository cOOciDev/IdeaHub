import mongoose from 'mongoose'
const schema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  expertise: String,
  is_active: { type: Boolean, default: true }
},{ timestamps: true })
export default mongoose.model('Judge', schema)
