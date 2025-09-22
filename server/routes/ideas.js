const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const upload = require('../middlewares/upload');
const ctrl = require('../controllers/ideaController');

router.post('/', auth, upload.single('file'), ctrl.create);
router.get('/', auth, ctrl.list);
router.get('/:id', auth, ctrl.get);
router.delete('/:id', auth, ctrl.remove);
router.patch('/:id', auth, ctrl.update);

module.exports = router;
