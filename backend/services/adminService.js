const User = require('../models/user');
const ArtistVerificationRequest = require('../models/artistVerificationRequest');
const ArtistProfile = require('../models/artistProfile');

module.exports = {
  // -- User management --
  async getAllUsers() {
    return User.find()
      .select('username email role isBlocked created_at updated_at')
      .sort({ created_at: -1 });
  },
  async setUserBlocked(userId, blocked = true) {
    return User.findByIdAndUpdate(userId, { isBlocked: blocked }, { new: true });
  },

  // -- Artist verification flow --
  async listVerificationRequests() {
    return ArtistVerificationRequest.find()
      .populate('userId', 'username email')
      .sort({ submittedAt: -1 });
  },
  async approveVerification(requestId, adminId) {
    const reqDoc = await ArtistVerificationRequest.findById(requestId);
    if (!reqDoc) throw new Error('Request not found');
    if (reqDoc.status !== 'pending') throw new Error('Cannot approve non-pending request');

    reqDoc.status = 'approved';
    reqDoc.processedAt = new Date();
    reqDoc.processedBy = adminId;
    await reqDoc.save();

    // Create or update ArtistProfile
    let profile = await ArtistProfile.findOne({ userId: reqDoc.userId });
    if (profile) {
      profile.isVerified = true;
      await profile.save();
    } else {
      await ArtistProfile.create({ userId: reqDoc.userId, isVerified: true });
    }

    return reqDoc;
  },
  async rejectVerification(requestId, adminId, reason = '') {
    const reqDoc = await ArtistVerificationRequest.findById(requestId);
    if (!reqDoc) throw new Error('Request not found');
    if (reqDoc.status !== 'pending') throw new Error('Cannot reject non-pending request');

    reqDoc.status = 'rejected';
    reqDoc.processedAt = new Date();
    reqDoc.processedBy = adminId;
    reqDoc.notes = reason;
    await reqDoc.save();
    return reqDoc;
  }
};