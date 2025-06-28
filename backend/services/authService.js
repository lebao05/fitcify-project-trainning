require("dotenv").config();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const sendMail = require("../services/emailService").sendMail;
const sendOtpForCreatingAccount = async (email) => {
  try {
    const otp = Math.floor(100000 + Math.random() * 900000);
    const text = `<p>Your OTP is <strong>${otp}</strong> for creating account</p>`;
    await sendMail(email, text, "Your OTP Code");
    return otp;
  } catch (error) {
    throw new Error("Error sending OTP: " + error.message);
  }
};

const generateAccessToken = (payload) => {
  try {
    const access_token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
    return access_token;
  } catch (err) {
    throw err;
  }
};
const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  }
  catch (err) {
    throw err;
  }
};
const signUpWithGmail = async ({ username, email, password, dateOfBirth, gender }) => {
  if (await User.findOne({ email })) {
    throw new Error("Email already in use");
  }
  const user = await User.create({
    username,
    email,
    password,
    dateOfBirth,
    gender,
    authProvider: "email",
  });
  const token = generateAccessToken({
    id: user._id,
    role: user.role,
    username: user.username,
  });
  return { user, token };
}
const setAuthCookie = (res, token, opts = {}) => {
  const {
    remember = false,
    sameSite = "Lax",
    secure = false,
  } = opts;
  const maxAge = remember ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000; // 30 d vs 1 d
  res.cookie("accessToken", token, {
    httpOnly: true,
    sameSite,
    secure,
    maxAge,
  });
}
const loginWithEmailPassword = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  // 2️⃣  Make sure this is an email‑based account
  if (user.authProvider !== "email") {
    throw new Error("Use social login for this account");
  }
  const ok = await user.comparePassword(password);
  if (!ok) throw new Error("Invalid credentials");

  const accessToken = generateAccessToken({
    id: user._id,
    role: user.role,
    username: user.username,
  });
  return { user, accessToken };
}
module.exports = {
  sendOtpForCreatingAccount, generateAccessToken,
  verifyToken, signUpWithGmail, setAuthCookie, loginWithEmailPassword
};
