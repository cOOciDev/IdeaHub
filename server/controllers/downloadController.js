const path = require('path');
const fs = require('fs');
const Idea = require('../models/Idea');

// GET /:fileId  → finds file subdoc in Idea.files and streams it
exports.byId = async (req, res) => {
  const fileId = req.params.fileId;
  const idea = await Idea.findOne({ 'files._id': fileId }, { 'files.$': 1 }).lean();
  if (!idea || !idea.files || !idea.files[0]) return res.status(404).json({ message: 'File not found' });
  const f = idea.files[0];
  const fullPath = path.join(__dirname, '..', f.path.replace('/uploads/', 'uploads/'));
  if (!fs.existsSync(fullPath)) return res.status(404).json({ message: 'Missing on disk' });
  res.setHeader('Content-Type', f.mime || 'application/octet-stream');
  res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(f.name)}"`);
  fs.createReadStream(fullPath).pipe(res);
};
