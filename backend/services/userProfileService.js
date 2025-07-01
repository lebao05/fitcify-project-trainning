
const User = require('../models/user');
const cloudinary = require('../configs/cloudinary');
const { uploadToCloudinary } = require('../services/cloudinaryService');

function extractPublicId(url) {
  const m = url.match(/\/upload\/v\d+\/(.+?)\.[a-zA-Z0-9]+$/);
  return m ? m[1] : null;
}

const getProfileInfo = async (req, res, next) => {
  try {
    const me = await User.findById(req.user.id)
      .select('username avatarUrl followees')
      .lean();
    if (!me) return res.status(404).json({ message: 'User not found' });

    const followedArtistCount = await User.countDocuments({
      _id: { $in: me.followees },
      role: 'artist',
    });

    res.json({
      username: me.username,
      avatarUrl: me.avatarUrl,
      followedArtistCount,
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
    res.json({ artists });
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
      await require('fs/promises').unlink(req.file.path).catch(() => {});

      const user = await User.findById(req.user.id).select('avatarUrl');
      if (user && user.avatarUrl) {
        const oldId = extractPublicId(user.avatarUrl);
        if (oldId) cloudinary.uploader.destroy(oldId).catch(console.error);
      }
      updates.avatarUrl = secure_url;
    }

    const me = await User.findByIdAndUpdate(req.user.id, updates, {
      new: true,
      runValidators: true,
      select: 'username avatarUrl',
    });
    res.json(me);
  } catch (err) {
    next(err);
  }
};


const deleteProfileAvatar = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('avatarUrl');
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.avatarUrl) {
      const id = extractPublicId(user.avatarUrl);
      if (id) cloudinary.uploader.destroy(id).catch(console.error);
      user.avatarUrl = '';
      await user.save();
    }
    res.json({ avatarUrl: '' });
  } catch (err) {
    next(err);
  }
};
module.exports = {
    getProfileInfo,
    getFollowedArtists,
    updateProfileInfo,
    deleteProfileAvatar,
};