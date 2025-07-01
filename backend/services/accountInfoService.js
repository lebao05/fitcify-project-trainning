const User = require('../models/user');


const getAccountInfo = async (req, res, next) => {
  try {
    const me = await User.findById(req.user.id)
      .select('username email gender dateOfBirth country');
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

    if (email)  updates.email  = email.toLowerCase().trim();
    if (gender && ['male','female','other'].includes(gender)) updates.gender = gender;
    if (dateOfBirth && !Number.isNaN(Date.parse(dateOfBirth)))
      updates.dateOfBirth = new Date(dateOfBirth);
    if (country) updates.country = country;

    const me = await User.findByIdAndUpdate(req.user.id, updates, {
      new: true,
      runValidators: true,
      select: 'username email gender dateOfBirth country',
    });
    res.json(me);
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ message: 'Email already in use' });
    next(err);
  }
};
module.exports = {
  getAccountInfo,
  updateAccountInfo
};
