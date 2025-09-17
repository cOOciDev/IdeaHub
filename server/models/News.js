import mongoose from 'mongoose'
const schema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  body: { type: String, default: '' },
  cover_url: String,
  tags: [String],
  published: { type: Boolean, default: true }
},{ timestamps: true })
export default mongoose.model('News', schema)
