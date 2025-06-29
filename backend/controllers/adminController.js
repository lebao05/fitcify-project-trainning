const adminService = require('../services/adminService');

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await adminService.getAllUsers();
    res.json({ message: 'Users fetched', Error: 0, data: users });
  } catch (err) {
    next(err);
  }
};

exports.listVerificationRequests = async (req, res, next) => {
  try {
    const list = await adminService.listVerificationRequests();
    res.json({ message: 'Artist verification requests fetched', Error: 0, data: list });
  } catch (err) {
    next(err);
  }
};

exports.approveVerification = async (req, res, next) => {
  try {
    const doc = await adminService.approveVerification(req.params.id, req.user._id);
    res.json({ message: 'Artist verification approved', Error: 0, data: doc });
  } catch (err) {
    next(err);
  }
};

exports.rejectVerification = async (req, res, next) => {
  try {
    const reason = req.body.reason || '';
    const doc = await adminService.rejectVerification(req.params.id, req.user._id, reason);
    res.json({ message: 'Artist verification rejected', Error: 0, data: doc });
  } catch (err) {
    next(err);
  }
};