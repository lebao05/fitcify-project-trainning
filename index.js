const express = require('express');
const multer = require('multer');
const cloudinary = require('./config/cloudinary');
const fs = require('fs');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.static('public')); 

app.get('/', (req, res) => {
  res.redirect('/upload.html');
});


// Route upload
app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'demo-folder',
      use_filename: true,
      unique_filename: false,
      overwrite: true
    });

    fs.unlinkSync(req.file.path)

    res.send(`
      <h2>Upload thành công!</h2>
      <img src="${result.secure_url}" width="400" />
      <p><a href="/upload.html">Upload thêm ảnh</a></p>
    `);
  } catch (err) {
    console.error(err);
    res.status(500).send('Lỗi khi upload ảnh');
  }
});

app.listen(3000, () => console.log('Server running at: http://localhost:3000'));
