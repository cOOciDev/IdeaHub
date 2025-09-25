const multer = require('multer');
const path = require('path');

// helper to lazy-load nanoid since it's ESM
async function getNanoId(size = 8) {
  const { nanoid } = await import('nanoid');
  return nanoid(size);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) =>
    cb(null, path.join(__dirname, '..', 'uploads')),

  filename: async (req, file, cb) => {
    try {
      const ext = path.extname(file.originalname) || '';
      const id = await getNanoId(8);
      cb(null, `${Date.now()}-${id}${ext}`);
    } catch (err) {
      cb(err);
    }
  }
});

module.exports = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const ok = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ].includes(file.mimetype);
    cb(ok ? null : new Error('INVALID_FILE_TYPE'));
  }
});
