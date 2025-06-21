// services/uploadService.js
const express = require('express');
const multer  = require('multer');
const path    = require('path');
const fs      = require('fs');

const router = express.Router();

// 1️⃣ Tạo folder lưu ảnh nếu chưa có
const imagesDir = path.resolve(__dirname, '../uploads/images');
fs.mkdirSync(imagesDir, { recursive: true });

// 2️⃣ Cấu hình Multer
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, imagesDir),
  filename: (_req, file, cb) => {
    const ext  = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    cb(null, `${name}-${Date.now()}${ext}`);
  }
});

// (Tuỳ chọn) chỉ cho phép upload image
const imageFilter = (_req, file, cb) => {
  if (file.mimetype.startsWith('image/')) cb(null, true);
  else cb(new Error('Chỉ cho phép file ảnh'), false);
};

const upload = multer({
  storage,
  fileFilter: imageFilter,
  limits: { fileSize: 2 * 1024 * 1024 } // 2MB
});

// 3️⃣ Định nghĩa route ngay trong file service
//    POST http://<host>:<port>/api/upload/image
router.post(
  '/api/upload/image',
  upload.single('image'),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'Không có file image được gửi lên' });
    }
    const publicPath = `/uploads/images/${req.file.filename}`;
    res.status(201).json({
      message: 'Upload image thành công!',
      path: publicPath
    });
  }
);

module.exports = router;
