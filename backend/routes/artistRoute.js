// routes/artist.routes.js
const express = require("express");
const router = express.Router();
const artistController = require("../controllers/artistController");
const { songUploader } = require("../services/uploadService");
router.post("/verification-request", artistController.submitVerificationRequest);
router.post(
    '/upload-song', songUploader,artistController.uploadSong
);
module.exports = router;
