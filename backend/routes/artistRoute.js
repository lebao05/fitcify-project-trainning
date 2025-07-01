// routes/artist.routes.js
const express = require("express");
const router = express.Router();
const artistController = require("../controllers/artistController");

router.post("/verification-request", artistController.submitVerificationRequest);

module.exports = router;
