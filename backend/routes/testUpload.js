const express = require('express');
const router = express.Router();
const uploadService = require('../services/uploadService');
const { uploadToCloudinary } = require('../services/cloudinaryService');

router.post('/image', uploadService.imageUploader.single('file'), async (req, res) => {
  try {
    const filePath = req.file.path;
    const result = await uploadToCloudinary(filePath);
    res.status(200).json({ url: result.secure_url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
