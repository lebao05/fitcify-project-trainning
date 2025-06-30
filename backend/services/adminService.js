const User                      = require('../models/user');
const ArtistVerificationRequest = require('../models/artistVerificationRequest');
const ArtistProfile             = require('../models/artistProfile');
const Song                      = require('../models/song');

async function getAllUsers() {
  return User.find()
    .select('username email role isBlocked created_at updated_at')
    .sort({ created_at: -1 });
}

async function setUserBlocked(userId, blocked = true) {
  return User.findByIdAndUpdate(userId, { isBlocked: blocked }, { new: true });
}

async function listVerificationRequests() {
  return ArtistVerificationRequest.find()
    .populate('userId', 'username email')
    .sort({ submittedAt: -1 });
}

async function approveVerification(requestId, adminId) {
  const reqDoc = await ArtistVerificationRequest.findById(requestId);
  if (!reqDoc) throw new Error('Request not found');
  if (reqDoc.status !== 'pending') throw new Error('Cannot approve non-pending request');
  reqDoc.status      = 'approved';
  reqDoc.processedAt = new Date();
  reqDoc.processedBy = adminId;
  await reqDoc.save();
  let profile = await ArtistProfile.findOne({ userId: reqDoc.userId });
  if (profile) {
    profile.isVerified = true;
    await profile.save();
  } else {
    await ArtistProfile.create({ userId: reqDoc.userId, isVerified: true });
  }
  return reqDoc;
}

async function rejectVerification(requestId, adminId, reason = '') {
  const reqDoc = await ArtistVerificationRequest.findById(requestId);
  if (!reqDoc) throw new Error('Request not found');
  if (reqDoc.status !== 'pending') throw new Error('Cannot reject non-pending request');
  reqDoc.status      = 'rejected';
  reqDoc.processedAt = new Date();
  reqDoc.processedBy = adminId;
  reqDoc.notes       = reason;
  await reqDoc.save();
  return reqDoc;
}

async function approveSong(songId, adminId) {
  const song = await Song.findById(songId);
  if (!song) throw new Error('Song not found');
  song.isApproved  = true;
  song.approvedAt  = new Date();
  song.approvedBy  = adminId;
  return song.save();
}

async function rejectSong(songId, adminId, reason = '') {
  const song = await Song.findById(songId);
  if (!song) throw new Error('Song not found');
  song.isApproved      = false;
  song.rejectionReason = reason;
  song.rejectedAt      = new Date();
  song.rejectedBy      = adminId;
  return song.save();
}

module.exports = {
  getAllUsers,
  setUserBlocked,
  listVerificationRequests,
  approveVerification,
  rejectVerification,
  approveSong,
  rejectSong
};
