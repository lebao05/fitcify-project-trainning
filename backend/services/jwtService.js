// JWT
require("dotenv").config();
const jwt = require("jsonwebtoken");

const getAccess_Token = (payload) => {
  try {
    const access_token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
    return access_token;
  } catch (err) {
    return next(err);
  }
};
const getRefresh_Token = (payload) => {
  try {
    const access_token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });
    return access_token;
  } catch (err) {
    return next(err);
  }
};
const verifyToken = (token) => {
  if (!token) {
    throw new Error("Token is required");
  }
  return jwt.verify(token, process.env.JWT_SECRET);
};
module.exports = { getAccess_Token, getRefresh_Token, verifyToken };