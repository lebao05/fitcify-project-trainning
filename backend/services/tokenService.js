// JWT
require("dotenv").config();
const jwt = require("jsonwebtoken");

const getAccessToken = (payload) => {
  try {
    const access_token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
    return access_token;
  } catch (err) {
    return next(err);
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
module.exports = { getAccessToken, verifyToken };