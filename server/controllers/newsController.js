const News = require('../models/News');

exports.list = async (req, res) => {
  const items = await News.find({ published: true }).sort({ createdAt: -1 }).lean();
  res.json(items);
};
