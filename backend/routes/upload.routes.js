const express = require('express');
const router = express.Router();
const { uploadImage } = require('../controllers/upload.controller');
const { uploadImage: imageMw } = require('../middlewares/upload.middleware');


router.post('/image', imageMw.single('image'), uploadImage);

module.exports = router;
