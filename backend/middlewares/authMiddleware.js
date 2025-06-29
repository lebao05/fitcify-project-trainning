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

const verifyAdmin = async (req, res, next) => {
  if (!req.user) {
    return res.status(403).json({ ER: 1, EM: "Forbidden: Not logged in" });
  }
  if (req.user.role !== 'admin') {
    return res.status(403).json({ ER: 1, EM: "Forbidden: Admins only" });
  }
  next();
};


module.exports = { authMiddleware,verifyAdmin };
