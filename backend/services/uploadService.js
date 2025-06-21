const express = require('express');
const multer  = require('multer');
const path    = require('path');
const fs      = require('fs');

const router = express.Router();

const imagesDir = path.resolve(__dirname, '../uploads/images');
fs.mkdirSync(imagesDir, { recursive: true });

const Imagestorage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, imagesDir),
  filename: (_req, file, cb) => {
    const ext  = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    cb(null, `${name}-${Date.now()}${ext}`);
  }
});

// (Optional) allow only image upload
const imageFilter = (_req, file, cb) => {
  if (file.mimetype.startsWith('image/')) cb(null, true);
  else cb(new Error('Only image files are allowed'), false);
};

const upload = multer({
  storage: Imagestorage,
  fileFilter: imageFilter,
  limits: { fileSize: 2 * 1024 * 1024 } // 2MB
});


router.post(
  '/api/upload/image',
  upload.single('image'),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file uploaded' });
    }
    const publicPath = `/uploads/images/${req.file.filename}`;
    res.status(201).json({
      message: 'Image uploaded successfully!',
      path: publicPath
    });
  }
);

// Create directory for audio storage if not exists
const audiosDir = path.resolve(__dirname, '../uploads/audios');
fs.mkdirSync(audiosDir, { recursive: true });

const Audiostorage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, audiosDir),
  filename: (_req, file, cb) => {
    const ext  = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    cb(null, `${name}-${Date.now()}${ext}`);
  }
});

// Allow only audio upload
const audioFilter = (_req, file, cb) => {
  if (file.mimetype.startsWith('audio/')) cb(null, true);
  else cb(new Error('Only audio files are allowed'), false);
};

const uploadAudio = multer({
  storage: Audiostorage,
  fileFilter: audioFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

router.post(
  '/api/upload/audio',
  uploadAudio.single('audio'),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No audio file uploaded' });
    }
    const publicPath = `/uploads/audios/${req.file.filename}`;
    res.status(201).json({
      message: 'Audio uploaded successfully!',
      path: publicPath
    });
  }
);

module.exports = router;
