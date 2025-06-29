const ArtistProfile = require('../models/artistProfile');
const ArtistVerificationRequest = require('../models/artistVerificationRequest');

module.exports = {

  async fetchArtistProfiles(userId = null) {
    if (userId) {
      return ArtistProfile
        .findOne({ userId })
        .populate('userId', 'username email')
        .populate('albums')
        .populate('songs');
    }
    return ArtistProfile
      .find()
      .populate('userId', 'username email')
      .sort({ createdAt: -1 });
  },


  async upsertProfile(userId, data) {
    let profile = await ArtistProfile.findOne({ userId });
    if (profile) {
      Object.assign(profile, data);
      return profile.save();
    }
    return ArtistProfile.create({ userId, ...data });
  },

  async submitVerification(userId) {
    const pending = await ArtistVerificationRequest.findOne({ userId, status: 'pending' });
    if (pending) throw new Error('Yêu cầu xác thực đang chờ xử lý');
    return ArtistVerificationRequest.create({ userId });
  },

  async fetchVerificationStatus(userId) {
    return ArtistVerificationRequest
      .findOne({ userId })
      .sort({ submittedAt: -1 });
  }
};
