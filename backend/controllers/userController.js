const User = require('../models/user'); 
const cloudinary = require('../configs/cloudinary'); 
const { uploadToCloudinary } = require('../services/cloudinaryService');

function extractPublicId(url) {
  const m = url.match(/\/upload\/v\d+\/(.+?)\.[a-zA-Z0-9]+$/);
  return m ? m[1] : null;
}

const getProfileInfo = async (req, res, next) => {
  try {
    const me = await User.findById(req.user.id).select('username avatarUrl followees');
    if (!me) return res.status(404).json({ message: 'User not found' });
    res.json(me);
  } catch (err) {
    next(err);
  }
};
const getFollowedArtists = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('followees');
    if (!user) return res.status(404).json({ message: 'User not found' });

    const artists = await User.find({ _id: { $in: user.followees }, role: 'artist' })
      .select('username avatarUrl');

    res.json(artists);
  } catch (err) {
    next(err);
  }
};

const updateProfileInfo = async (req, res, next) => {
  try {
    const updates = {};
    if (req.body.username) updates.username = req.body.username;

    if (req.file) {
      const { secure_url , public_id } = await uploadToCloudinary(req.file.path, 'avatars');

      const user = await User.findById(req.user.id).select('avatarUrl');
      if (user && user.avatarUrl) {
        const oldId = extractPublicId(user.avatarUrl);
        if (oldId) {
          try { await cloudinary.uploader.destroy(oldId); } 
            catch (err) {
                console.error('Error deleting old avatar from Cloudinary:', err.message);
            }
        }
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
      const publicId = extractPublicId(user.avatarUrl);
      if (publicId) {
        try { await cloudinary.uploader.destroy(publicId); } catch (
            err 
            ) {
            console.error('Error deleting avatar from Cloudinary:', err.message);
            }
      }
      user.avatarUrl = '';
      await user.save();
    }

    res.json({ avatarUrl: '' });
  } catch (err) {
    next(err);
  }
};

const getAccountInfo = async (req, res, next) => {
  try {
    const me = await User.findById(req.user.id).select(
      'username email gender dateOfBirth country'
    );
    if (!me) return res.status(404).json({ message: 'User not found' });
    res.json(me);
  } catch (err) {
    next(err);
  }
};

const updateAccountInfo = async (req, res, next) => {
  try {
    const { email, gender, dateOfBirth, country } = req.body;
    const updates = {};

    if (email) updates.email = email.toLowerCase().trim();
    if (gender) updates.gender = gender;               
    if (dateOfBirth) updates.dateOfBirth = new Date(dateOfBirth);
    if (country) updates.country = country;

    const me = await User.findByIdAndUpdate(req.user.id, updates, {
      new: true,
      runValidators: true,
      select: 'username email gender dateOfBirth country',
    });

    res.json(me);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: 'Email already in use' });
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
    updateAccountInfo,
};