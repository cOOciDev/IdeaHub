const jwt = require('jsonwebtoken');

module.exports = function auth (req, res, next) {
  const hdr = req.headers.authorization || '';
  const token = hdr.startsWith('Bearer ') ? hdr.slice(7) : null;
  if (!token) return res.status(401).json({ code: 'UNAUTHORIZED', message: 'No token' });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload; // { _id, role, name, email }
    return next();
  } catch (e) {
    return res.status(401).json({ code: 'UNAUTHORIZED', message: 'Invalid token' });
  }
};
