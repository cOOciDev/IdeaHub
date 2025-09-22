const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const ctrl = require('../controllers/downloadController');

router.get('/:fileId', auth, ctrl.byId);

module.exports = router;
