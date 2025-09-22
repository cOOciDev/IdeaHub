const Idea = require('../models/Idea');

exports.create = async (req, res) => {
  const { title, track, summary, members } = req.body;
  if (!title || !track || !summary || summary.length < 50) {
    return res.status(400).json({ message: 'Invalid fields (summary min 50 chars)' });
  }
  const files = [];
  if (req.file) {
    files.push({
      name: req.file.originalname,
      storedName: req.file.filename,
      size: req.file.size,
      mime: req.file.mimetype,
      path: `/uploads/${req.file.filename}`
    });
  }
  const idea = await Idea.create({
    title,
    track,
    summary,
    members: members ? JSON.parse(members) : [],
    submitterId: req.user._id,
    files
  });
  res.status(201).json(serializeIdea(idea));
};

exports.list = async (req, res) => {
  const q = {};
  if (req.query.mine === 'true') q.submitterId = req.user._id;
  const ideas = await Idea.find(q).sort({ createdAt: -1 }).lean();
  res.json(ideas.map(serializeIdea));
};

exports.get = async (req, res) => {
  const idea = await Idea.findById(req.params.id).lean();
  if (!idea) return res.status(404).json({ message: 'Not found' });
  res.json(serializeIdea(idea));
};

exports.remove = async (req, res) => {
  const idea = await Idea.findOne({ _id: req.params.id, submitterId: req.user._id });
  if (!idea) return res.status(404).json({ message: 'Not found' });
  await Idea.deleteOne({ _id: idea._id });
  res.json({ ok: true });
};

exports.update = async (req, res) => {
  const { title, track, summary, members } = req.body;
  const set = {};
  if (title) set.title = title;
  if (track) set.track = track;
  if (summary) set.summary = summary;
  if (members) set.members = JSON.parse(members);
  const idea = await Idea.findOneAndUpdate({ _id: req.params.id, submitterId: req.user._id }, { $set: set }, { new: true });
  if (!idea) return res.status(404).json({ message: 'Not found' });
  res.json(serializeIdea(idea.toObject()));
};

function serializeIdea (doc) {
  return {
    id: String(doc._id),
    title: doc.title,
    track: doc.track,
    summary: doc.summary,
    members: doc.members || [],
    status: doc.status || 'submitted',
    files: (doc.files || []).map(f => ({
      id: String(f._id || f.id),
      name: f.name,
      url: f.path
    })),
    createdAt: doc.createdAt
  };
}
