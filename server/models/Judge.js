const mongoose = require('mongoose');

const JudgeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  expertise: [String]
}, { timestamps: true });

module.exports = mongoose.model('Judge', JudgeSchema);
