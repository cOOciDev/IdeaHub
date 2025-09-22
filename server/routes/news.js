const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/newsController');

router.get('/', ctrl.list);

module.exports = router;
