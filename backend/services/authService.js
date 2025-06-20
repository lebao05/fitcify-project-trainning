require("dotenv").config();
const User = require("../models/user");
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
module.exports = {
  checkGmailAccountExists,
  sendOtpForCreatingAccount,
};
