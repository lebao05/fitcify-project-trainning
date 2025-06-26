// backend/middlewares/authMiddleware.js

// 1. Nạp biến môi trường (thường chỉ cần gọi 1 lần ở entry point, nhưng thêm vào đây cũng ổn)
require("dotenv").config();

// 2. Dùng lại logic JWT đã đóng gói trong service
const { verifyToken } = require("../services/jwtService");

// 3. Path đúng tới model và helper của bạn
const User = require("../models/user");
const { validObjectId } = require("../helpers/validateObjectId");

const authMiddleware = async (req, res, next) => {
  try {
    // 4. Kiểm header
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ ER: 1, EM: "Unauthorized: No token provided" });
    }

    // 5. Tách token và verify bằng jwtService
    const token = auth.split(" ")[1];
    let payload;
    try {
      payload = verifyToken(token);   // ném nếu sai hoặc hết hạn
    } catch (e) {
      return res.status(401).json({ ER: 1, EM: "Invalid or expired token" });
    }

    // 6. Kiểm ID có đúng ObjectId không
    validObjectId(payload.id);

    // 7. Tải user từ DB
    const user = await User.findById(payload.id);
    if (!user) {
      return res
        .status(401)
        .json({ ER: 1, EM: "Unauthorized: User not found" });
    }

    // 8. Gắn user vào req rồi qua controller
    req.user = user;
    next();
  } catch (err) {
    // 9. Bắt lỗi chung
    return res.status(401).json({ ER: 1, EM: "Authentication error" });
  }
};

const isAdmin = (req, res, next) => {
  // Gọi authMiddleware trước rồi mới đến đây → req.user đã có
  if (req.user.role === "admin") {
    return next();
  }
  return res.status(403).json({ ER: 1, EM: "Forbidden: Admins only" });
};

module.exports = { authMiddleware, isAdmin };
