const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const generateRandomFilename = (ext) =>
  `${crypto.randomBytes(16).toString('hex')}${ext}`;

/* ---------- generic factory ---------- */
const createUploader = ({ folder, mimeTest, sizeLimitMB }) => {
  const absDir = path.resolve(__dirname, `../uploads/${folder}`);
  fs.mkdirSync(absDir, { recursive: true });

  const storage = multer.diskStorage({
    destination: (_req, file, cb) => cb(null, absDir),
    filename: (_req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, generateRandomFilename(ext));
    },
  });

  const fileFilter = (_req, file, cb) => {
    cb(null, mimeTest(file.mimetype));
  };

  return multer({
    storage,
    fileFilter,
    limits: { fileSize: sizeLimitMB * 1024 * 1024 },
  });
};

/* ---------- dedicated uploaders ---------- */
const imageUploader = createUploader({
  folder: 'images',
  mimeTest: (m) => m.startsWith('image/'),
  sizeLimitMB: 2,
});

const audioUploader = createUploader({
  folder: 'audios',
  mimeTest: (m) => m.startsWith('audio/'),
  sizeLimitMB: 10,
});

/* ---------- mixed uploader for songs ---------- */
const songUploader = multer({
  storage: multer.diskStorage({
    destination: (_req, file, cb) => {
      const base = file.mimetype.startsWith('audio/') ? 'audios' : 'images';
      const abs = path.resolve(__dirname, `../uploads/${base}`);
      fs.mkdirSync(abs, { recursive: true });
      cb(null, abs);
    },
    filename: (_req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, generateRandomFilename(ext));
    },
  }),
  fileFilter: (_req, file, cb) => {
    const ok =
      file.mimetype.startsWith('audio/') || file.mimetype.startsWith('image/');
    cb(ok ? null : new Error('Only audio or image files allowed'), ok);
  },
  limits: { fileSize: 20 * 1024 * 1024 },
}).fields([
  { name: 'audio', maxCount: 1 },
  { name: 'image', maxCount: 1 },
]);

module.exports = { imageUploader, audioUploader, songUploader };
