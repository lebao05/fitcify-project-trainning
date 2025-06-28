// routes/adminRoute.js
const express = require('express');
const { getAllUsers } = require('../controllers/adminController');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware'); // ✅ fixed here
const router = express.Router();

router.get('/users', authMiddleware, isAdmin, getAllUsers); // ✅ works

module.exports = router;
