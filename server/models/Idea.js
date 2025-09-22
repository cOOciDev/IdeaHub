const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
  name: String,
  storedName: String,
  size: Number,
  mime: String,
  path: String
}, { timestamps: true });

const IdeaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  track: { type: String, required: true },
  summary: { type: String, required: true },
  members: [{ type: String }],
  submitterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  files: [FileSchema],
  status: { type: String, enum: ['submitted','under_review','scored','rejected','accepted'], default: 'submitted' }
}, { timestamps: true });

IdeaSchema.index({ submitterId: 1, createdAt: -1 });

module.exports = mongoose.model('Idea', IdeaSchema);
