const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

router.get("/users", authMiddleware, isAdmin, adminController.getAllUsers);

// Lấy danh sách yêu cầu xác minh nghệ sĩ
router.get(
  "/artists/verification-requests",
  authMiddleware,
  isAdmin,
  adminController.getAllArtistVerificationRequests
);

// Duyệt yêu cầu xác minh nghệ sĩ
router.patch(
  "/artists/:id/approve",
  authMiddleware,
  isAdmin,
  adminController.approveArtistRequest
);

// Từ chối yêu cầu xác minh nghệ sĩ
router.patch(
  "/artists/:id/reject",
  authMiddleware,
  isAdmin,
  adminController.rejectArtistRequest
);

// Khoá tài khoản nghệ sĩ
router.patch(
  "/artists/:id/suspend",
  authMiddleware,
  isAdmin,
  adminController.suspendArtist
);

// Mở khoá tài khoản nghệ sĩ
router.patch(
  "/artists/:id/activate",
  authMiddleware,
  isAdmin,
  adminController.activateArtist
);

module.exports = router;
