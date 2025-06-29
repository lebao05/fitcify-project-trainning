const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/authMiddleware');
const adminController = require('../controllers/adminController');

// Protect all admin routes and ensure role=admin
router.use(authMiddleware, (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden', Error: 1 });
  }
  next();
});

// User management
router.get('/admin/users', adminController.getAllUsers);
router.post('/admin/users/:id/block', async (req, res, next) => {
  try {
    const updated = await adminService.setUserBlocked(req.params.id, true);
    res.json({ message: 'User blocked', Error: 0, data: updated });
  } catch (err) { next(err); }
});

// Artist verification management
router.get('/admin/artist-verifications', adminController.listVerificationRequests);
router.post('/admin/artist-verifications/:id/approve', adminController.approveVerification);
router.post('/admin/artist-verifications/:id/reject', adminController.rejectVerification);

module.exports = router;