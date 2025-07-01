const express = require("express");
const router = express.Router();
const { authMiddleware, isArtist } = require("../middlewares/authMiddleware");
const uploadService = require("../services/uploadService");
const artistController = require("../controllers/artistController");

router.post(
  "/songs",
  authMiddleware,
  isArtist,
  uploadService.audioUploader.single("audioFile"),
  artistController.uploadSong
);

module.exports = router;
