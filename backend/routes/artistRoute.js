const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/authMiddleware');
const artistSongCtrl = require('../controllers/artistController');

router.use(authMiddleware);

router.post('/artist/songs', artistSongCtrl.createSong);

router.get('/artist/songs', artistSongCtrl.listMySongs);

module.exports = router;
