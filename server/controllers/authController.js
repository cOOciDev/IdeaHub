const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });
  const exists = await User.findOne({ email });
  if (exists) return res.status(409).json({ message: 'Email in use' });
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, passwordHash });
  const token = jwt.sign({ _id: user._id, role: user.role, name: user.name, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({ token });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ _id: user._id, role: user.role, name: user.name, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({ token });
};

exports.me = async (req, res) => {
  const u = await User.findById(req.user._id).lean();
  if (!u) return res.status(404).json({ message: 'User not found' });
  res.json({ id: u._id, name: u.name, email: u.email, role: u.role });
};
