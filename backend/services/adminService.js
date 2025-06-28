// services/adminService.js
const User = require('../models/user');

/**
 * Return every user, hiding sensitive fields.
 */
const getAllUsers = async () => {
    return await User.find();
}

module.exports = { getAllUsers };