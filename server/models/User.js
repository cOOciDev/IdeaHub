import mongoose from 'mongoose'
const schema = new mongoose.Schema({
  phone: { type: String, required: true, unique: true },
  first_name: String,
  last_name: String,
  role: { type: String, enum: ['admin','judge','user'], default: 'user' },
  national_id: String
},{ timestamps: true })
export default mongoose.model('User', schema)
