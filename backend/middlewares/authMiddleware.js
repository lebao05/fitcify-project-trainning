require("dotenv").config();

const { verifyToken } = require("../services/tokenService");
const User = require("../models/user");
const { validObjectId } = require("../helpers/validateObjectId");

const authMiddleware = async (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ ER: 1, EM: "Unauthorized: No token provided" });
    }
    const token = auth.split(" ")[1];
    let payload;
    try {
      payload = verifyToken(token);
    } catch (e) {
      return res.status(401).json({ ER: 1, EM: "Invalid or expired token" });
    }

    validObjectId(payload.id);
    const user = await User.findById(payload.id);
    if (!user) {
      return res
        .status(401)
        .json({ ER: 1, EM: "Unauthorized: User not found" });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ ER: 1, EM: "Authentication error" });
  }
};

module.exports = { authMiddleware };
