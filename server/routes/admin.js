const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

// Simple RBAC helper
function rbac (roles = []) {
  return (req, res, next) => {
    if (!roles.length || roles.includes(req.user?.role)) return next();
    return res.status(403).json({ message: 'Forbidden' });
  };
}

router.get('/health', (req, res) => res.json({ ok: true }));
router.get('/ready', (req, res) => res.json({ db: true }));

// example protected admin route
router.get('/dashboard', auth, rbac(['admin', 'secretary']), (req, res) => {
  res.json({ stats: {} });
});

module.exports = router;
