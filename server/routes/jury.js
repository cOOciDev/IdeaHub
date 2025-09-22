const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const ctrl = require('../controllers/juryController');

router.get('/', auth, ctrl.list);

module.exports = router;
