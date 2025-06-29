const User = require('../models/user');
const ArtistVerificationRequest = require('../models/artistVerificationRequest');
const ArtistProfile = require('../models/artistProfile');

exports.getAllArtistVerificationRequests = async () => {
  return await ArtistVerificationRequest
    .find({ status: 'pending' })
    .populate('userId', 'username email avatarUrl');
};

exports.approveArtistRequest = async (userId, adminId) => {
  const request = await ArtistVerificationRequest.findOne({ userId, status: 'pending' });
  if (!request) throw new Error('No pending request found');

  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  // Update request
  request.status = 'approved';
  request.processedAt = new Date();
  request.processedBy = adminId;
  await request.save();

  // Update user
  user.role = 'artist';
  user.isApproved = true;
  await user.save();

  // Create artist profile if missing
  const existingProfile = await ArtistProfile.findOne({ userId });
  if (!existingProfile) {
    await ArtistProfile.create({
      userId,
      isVerified: true,
      verificationRequestDate: new Date(),
    });
  }

  return { message: 'Artist approved' };
};

exports.rejectArtistRequest = async (userId, adminId) => {
  const request = await ArtistVerificationRequest.findOne({ userId, status: 'pending' });
  if (!request) throw new Error('No pending request found');

  request.status = 'rejected';
  request.processedAt = new Date();
  request.processedBy = adminId;
  await request.save();

  return { message: 'Artist request rejected' };
};

exports.suspendArtist = async (userId) => {
  const user = await User.findById(userId);
  if (!user || user.role !== 'artist') throw new Error('Artist not found');
  user.isBlocked = true;
  await user.save();
  return { message: 'Artist suspended' };
};

exports.activateArtist = async (userId) => {
  const user = await User.findById(userId);
  if (!user || user.role !== 'artist') throw new Error('Artist not found');
  user.isBlocked = false;
  await user.save();
  return { message: 'Artist activated' };
};
