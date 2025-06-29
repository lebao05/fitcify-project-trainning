// controllers/artistController.js
const artistService = require('../services/artistService');

module.exports = {
  async listProfiles(req, res, next) {
    try {
      const profiles = await artistService.fetchArtistProfiles();
      res.json({ message: 'Artist profiles fetched', Error: 0, data: profiles });
    } catch (err) {
      next(err);
    }
  },


  async getProfile(req, res, next) {
    try {
      const { userId } = req.params;
      const profile = await artistService.fetchArtistProfiles(userId);
      if (!profile) {
        return res.status(404).json({ message: 'Profile not found', Error: 1 });
      }
      res.json({ message: 'Profile fetched', Error: 0, data: profile });
    } catch (err) {
      next(err);
    }
  },


  async upsertProfile(req, res, next) {
    try {
      const data = req.body;
      const userId = req.user._id;
      const profile = await artistService.upsertProfile(userId, data);
      res.json({ message: 'Profile saved', Error: 0, data: profile });
    } catch (err) {
      next(err);
    }
  },


  async submitVerification(req, res, next) {
    try {
      const userId = req.user._id;
      const request = await artistService.submitVerification(userId);
      res.status(201).json({ message: 'Verification requested', Error: 0, data: request });
    } catch (err) {
      next(err);
    }
  },

  async getVerificationStatus(req, res, next) {
    try {
      const userId = req.user._id;
      const request = await artistService.fetchVerificationStatus(userId);
      if (!request) {
        return res.status(404).json({ message: 'No verification request found', Error: 1 });
      }
      res.json({ message: 'Verification status fetched', Error: 0, data: request });
    } catch (err) {
      next(err);
    }
  }
};
