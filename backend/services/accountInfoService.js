
const User = require('../models/user');

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
  getAccountInfo,
  updateAccountInfo
};
