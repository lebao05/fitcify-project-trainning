const express = require('express');
const router  = express.Router();
const { authMiddleware } = require('../middlewares/authMiddleware');
const artistCtrl = require('../controllers/artistController');

router.get('/artist/profiles',       artistCtrl.listProfiles);
router.get('/artist/profile/:userId', artistCtrl.getProfile);

router.post('/artist/profile',                    authMiddleware, artistCtrl.upsertProfile);
router.post('/artist/verification',               authMiddleware, artistCtrl.submitVerification);
router.get( '/artist/verification/status',        authMiddleware, artistCtrl.getVerificationStatus);

module.exports = router;
