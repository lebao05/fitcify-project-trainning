
const User = require('../models/user');
const cloudinary = require('../configs/cloudinary');
const { uploadToCloudinary } = require('../services/cloudinaryService');
const fs = require('fs/promises');

function extractPublicId(url) {
  const m = url.match(/\/upload\/v\d+\/(.+?)\.[a-zA-Z0-9]+$/);
  return m ? m[1] : null;
}

const getProfileInfo = async (req, res, next) => {
  try {
    const me = await User.findById(req.user.id)
      .select('username avatarUrl followees')
      .lean();
    if (!me) {
      return res.status(404).json({
        Error: 1,
        Message: 'User not found',
        Data: null
      });
    }
    const followedArtistCount = await User.countDocuments({
      _id: { $in: me.followees },
      role: 'artist',
    });
    res.json({
      Error: 0,
      Message: 'Get profile info successful',
      Data: {
        profile: {
          username: me.username,
          avatarUrl: me.avatarUrl,
          followedArtistCount
        }
      }
    });
  } catch (err) {
    next(err);
  }
};

const getFollowedArtists = async (req, res, next) => {
  try {
    const { followees } = await User.findById(req.user.id).select('followees');
    const artists = await User.find({ _id: { $in: followees }, role: 'artist' })
      .select('username avatarUrl')
      .sort({ _id: -1 });
    res.json({
      Error: 0,
      Message: 'Get followed artists successful',
      Data: { artists }
    });
  } catch (err) {
    next(err);
  }
};

const updateProfileInfo = async (req, res, next) => {
  try {
    const updates = {};
    if (req.body.username) updates.username = req.body.username;

    if (req.file) {
      const { secure_url } = await uploadToCloudinary(req.file.path, 'avatars');
      await fs.unlink(req.file.path);
      const user = await User.findById(req.user.id).select('avatarUrl');
      if (user && user.avatarUrl) {
        const oldId = extractPublicId(user.avatarUrl);
        if (oldId) cloudinary.uploader.destroy(oldId);
      }
      updates.avatarUrl = secure_url;
    }

    const me = await User.findByIdAndUpdate(req.user.id, updates, {
      new: true,
      runValidators: true,
      select: 'username avatarUrl',
    });
    if (!me) {
      return res.status(404).json({
        Error: 1,
        Message: 'User not found',
        Data: null
      });
    }
    res.json({
      Error: 0,
      Message: 'Update profile info successful',
      Data: {
        profile: { username: me.username, avatarUrl: me.avatarUrl }
      }
    });
  } catch (err) {
    next(err);
  }
};

const deleteProfileAvatar = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('avatarUrl');
    if (!user) {
      return res.status(404).json({
        Error: 1,
        Message: 'User not found',
        Data: null
      });
    }

    if (user.avatarUrl) {
      const id = extractPublicId(user.avatarUrl);
      if (id) cloudinary.uploader.destroy(id);
      user.avatarUrl = '';
      await user.save();
    }
    res.json({
      Error: 0,
      Message: 'Delete profile avatar successful',
      Data: { avatarUrl: '' }
    });
  } catch (err) {
    next(err);
  }
};

const getAccountInfo = async (req, res, next) => {
  try {
    const me = await User.findById(req.user.id)
      .select('username email gender dateOfBirth ');
    if (!me) {
      return res.status(404).json({
        Error: 1,
        Message: 'User not found',
        Data: null
      });
    }
    res.json({
      Error: 0,
      Message: 'Get account info successful',
      Data: { user: me }
    });
  } catch (err) {
    next(err);
  }
};

const updateAccountInfo = async (req, res, next) => {
  try {
    const { email, gender, dateOfBirth } = req.body;
    const updates = {};

    if (email)  updates.email  = email.toLowerCase().trim();
    if (gender && ['male','female','other'].includes(gender)) updates.gender = gender;
    if (dateOfBirth && !Number.isNaN(Date.parse(dateOfBirth)))
      updates.dateOfBirth = new Date(dateOfBirth);

    const me = await User.findByIdAndUpdate(req.user.id, updates, {
      new: true,
      runValidators: true,
      select: 'username email gender dateOfBirth ',
    });
    if (!me) {
      return res.status(404).json({
        Error: 1,
        Message: 'User not found',
        Data: null
      });
    }
    res.json({
      Error: 0,
      Message: 'Update account info successful',
      Data: { user: me }
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        Error: 1,
        Message: 'Email already in use',
        Data: null
      });
    }
    next(err);
  }
};
module.exports = {
    getProfileInfo,
    getFollowedArtists,
    updateProfileInfo,
    deleteProfileAvatar,
    getAccountInfo,
    updateAccountInfo
};
