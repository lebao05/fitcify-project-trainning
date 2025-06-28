// controllers/adminController.js
const adminService = require('../services/adminService');

const getAllUsers = async (req, res, next) => {
    try {
        const users = await adminService.getAllUsers();
        res.status(200).json({ message: 'Users fetched successfully', Error: 0, data: users });
    } catch (err) {
        next(err);
    }
};
module.exports = { getAllUsers }