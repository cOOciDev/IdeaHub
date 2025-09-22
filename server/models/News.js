const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
  title: String,
  body: String,
  published: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('News', NewsSchema);
