function uploadImage(req, res) {
  if (!req.file) {
    return res.status(400).json({ error: 'There is no image file is uploaded' });
  }
  const publicPath = `/uploads/images/${req.file.filename}`;
  res.status(201).json({
    message: 'Upload image successed!',
    path: publicPath
  });
}

module.exports = { uploadImage };
