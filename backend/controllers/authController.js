require("dotenv").config();
const User = require("../models/user");
const sendMail = require("../services/emailService").sendMail;
const { setAuthCookie, signUpWithGmail, loginWithEmailPassword } = require('../services/authService');
const register = async (req, res, next) => {
  try {
    const exist = await User.exists({ email: req.body.email });
    if (exist) {
      return res.status(400).json({
        EM: "Email already exists",
        ER: 0,
      });
    }
    const response = await User.create(req.body);
    return res.status(201).json({
      response,
      EM: "User registered successfully",
      ER: 0,
    });
  } catch (error) {
    next(error);
  }
};
const sendOtp = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        EM: "Email is required",
        ER: 1,
      });
    }
    const otp = Math.floor(100000 + Math.random() * 900000);
    const text = `<p>Your OTP is <strong>${otp}</strong></p>`;
    await sendMail(email, text, "Your OTP Code");
    return res.status(200).json({
      EM: "OTP sent successfully",
      ER: 0,
      otp,
    });
  } catch (error) {
    next(error);
  }
};
const signupWithGmail = async (req, res, next) => {
  try {
    const { user, token } = await signUpWithGmail(req.body);
    setAuthCookie(res, token);
    res.status(201).json({
      Error: 0,
      Message: "Login successful",
      Data: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
          gender: user.gender,
          dateOfBirth: user.dateOfBirth,
        },
      }
    });
  } catch (err) {
    next(err);
  }
}
const loginWithPassword = async (req, res, next) => {
  try {
    const { email, password, rememberMe = false } = req.body;

    const { user, accessToken } = await loginWithEmailPassword({
      email,
      password,
      remember: rememberMe,
    });

    setAuthCookie(res, accessToken, { remember: rememberMe });
    res.json({
      Error: 0,
      Message: "Login successful",
      Data: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
          gender: user.gender,
          dateOfBirth: user.dateOfBirth,
        },
      }
    });
  } catch (err) {
    next(err);
  }
}
module.exports = {
  register,
  sendOtp,
  signupWithGmail, loginWithPassword
};