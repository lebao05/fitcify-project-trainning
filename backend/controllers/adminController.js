// controllers/adminController.js
const adminService = require("../services/adminService");

// Hàm hiện tại bạn đã có
const getAllUsers = async (req, res, next) => {
  try {
    const users = await adminService.getAllUsers();
    res
      .status(200)
      .json({ message: "Users fetched successfully", Error: 0, data: users });
  } catch (err) {
    next(err);
  }
};

// Thêm các hàm quản lý tài khoản nghệ sĩ:
const getAllArtistVerificationRequests = async (req, res, next) => {
  try {
    const result = await adminService.getVerificationRequests();
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const approveArtistRequest = async (req, res, next) => {
  try {
    const result = await adminService.processVerificationRequest(
      req.params.id,
      "approve",
      req.user._id
    );
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const rejectArtistRequest = async (req, res, next) => {
  try {
    const result = await adminService.processVerificationRequest(
      req.params.id,
      "reject",
      req.user._id,
      req.body.reason
    );
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const suspendArtist = async (req, res, next) => {
  try {
    const result = await adminService.suspendUser(
      req.params.id,
      req.user._id,
      req.body.reason
    );
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const activateArtist = async (req, res, next) => {
  try {
    const result = await adminService.activateUser(req.params.id, req.user._id);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

// Export tất cả
module.exports = {
  getAllUsers,
  getAllArtistVerificationRequests,
  approveArtistRequest,
  rejectArtistRequest,
  suspendArtist,
  activateArtist,
};
