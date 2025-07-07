const express = require('express');
const router = express.Router();

const {
    imageUploader: uploadAvatar,
} = require('../services/uploadService');
const {
    getProfileInfo,
    getFollowedArtists,
    updateProfileInfo,
    deleteProfileAvatar,
    getAccountInfo,
    updateAccountInfo,
} = require('../controllers/userController');
router.get('/profile', getProfileInfo);
router.get('/followed-artists', getFollowedArtists);

router.patch(
    '/profile',
    uploadAvatar.single('avatar'), // multipart form‑data expected
    updateProfileInfo
);

router.delete('/profile/avatar', deleteProfileAvatar);

/* -------- protected account routes -------- */
router.get('/account', getAccountInfo);
router.patch('/account', updateAccountInfo);

module.exports = router;
