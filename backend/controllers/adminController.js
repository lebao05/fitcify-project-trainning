const adminService = require('../services/adminService');

async function getAllUsers(req, res, next) {
  try {
    const users = await adminService.getAllUsers();
    res.json({ message: 'Users fetched', Error: 0, data: users });
  } catch (err) {
    next(err);
  }
}

async function setUserBlockedController(req, res, next) {
  try {
    const updated = await adminService.setUserBlocked(req.params.id, true);
    res.json({ message: 'User blocked', Error: 0, data: updated });
  } catch (err) {
    next(err);
  }
}

async function listVerificationRequests(req, res, next) {
  try {
    const list = await adminService.listVerificationRequests();
    res.json({ message: 'Artist verification requests fetched', Error: 0, data: list });
  } catch (err) {
    next(err);
  }
}

async function approveVerification(req, res, next) {
  try {
    const doc = await adminService.approveVerification(req.params.id, req.user._id);
    res.json({ message: 'Artist verification approved', Error: 0, data: doc });
  } catch (err) {
    next(err);
  }
}

async function rejectVerification(req, res, next) {
  try {
    const reason = req.body.reason || '';
    const doc    = await adminService.rejectVerification(req.params.id, req.user._id, reason);
    res.json({ message: 'Artist verification rejected', Error: 0, data: doc });
  } catch (err) {
    next(err);
  }
}

async function approveSong(req, res, next) {
  try {
    const song = await adminService.approveSong(req.params.songId, req.user._id);
    res.json({ message: 'Song approved', Error: 0, data: song });
  } catch (err) {
    next(err);
  }
}

async function rejectSong(req, res, next) {
  try {
    const reason = req.body.reason || '';
    const song   = await adminService.rejectSong(req.params.songId, req.user._id, reason);
    res.json({ message: 'Song rejected', Error: 0, data: song });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllUsers,
  setUserBlocked: setUserBlockedController,
  listVerificationRequests,
  approveVerification,
  rejectVerification,
  approveSong,
  rejectSong
};