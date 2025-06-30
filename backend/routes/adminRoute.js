const express = require('express');
const router  = express.Router();
const adminController = require('../controllers/adminController');
const { authMiddleware } = require('../middlewares/authMiddleware');

router.use(authMiddleware, (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden', Error: 1 });
  }
  next();
});

router.get( '/admin/users',               adminController.getAllUsers );
router.post('/admin/users/:id/block',     adminController.setUserBlocked );

router.get( '/admin/artist-verifications',      adminController.listVerificationRequests );
router.post('/admin/artist-verifications/:id/approve', adminController.approveVerification );
router.post('/admin/artist-verifications/:id/reject',  adminController.rejectVerification );

router.post('/admin/songs/:songId/approve',  adminController.approveSong);
router.post('/admin/songs/:songId/reject',   adminController.rejectSong);

module.exports = router;
