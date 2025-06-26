// routes/authRoute.js
const express  = require('express');
const passport = require('passport');
const { register, sendOtp } = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login', session: true }),
  (_req, res) => res.redirect('http://localhost:5173')
);

router.get(
  '/facebook',
  passport.authenticate('facebook', { scope: ['email'] })
);
router.get(
  '/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login', session: true }),
  (_req, res) => res.redirect('http://localhost:5173')
);

router.post('/send-otp', sendOtp);

module.exports = router;
