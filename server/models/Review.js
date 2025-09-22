const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  ideaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Idea', required: true },
  judgeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  criteria: {
    innovation: Number,
    feasibility: Number,
    impact: Number,
    team: Number
  },
  total: Number,
  note: String
}, { timestamps: true });

ReviewSchema.index({ ideaId: 1, judgeId: 1 }, { unique: true });

module.exports = mongoose.model('Review', ReviewSchema);
