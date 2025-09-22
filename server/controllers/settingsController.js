const Settings = require('../models/Settings');

exports.getAll = async (req, res) => {
  const docs = await Settings.find({}).lean();
  const map = Object.fromEntries(docs.map(d => [d.key, d.value]));
  res.json(map);
};
