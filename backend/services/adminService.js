// services/adminService.js
const User = require("../models/user");
const ArtistVerificationRequest = require("../models/artistVerificationRequest"); // cần có file này

/**
 * Return every user, hiding sensitive fields.
 */
const getAllUsers = async () => {
  return await User.find();
};

// ✅ 1. Lấy tất cả yêu cầu xác minh nghệ sĩ
const getVerificationRequests = async () => {
  return await ArtistVerificationRequest.find({ status: "pending" }).populate(
    "artistId"
  );
};

// ✅ 2. Duyệt / từ chối yêu cầu xác minh nghệ sĩ
const processVerificationRequest = async (
  requestId,
  decision,
  adminId,
  reason = null
) => {
  const request = await ArtistVerificationRequest.findById(requestId);
  if (!request) throw new Error("Verification request not found");

  request.status = decision;
  request.reviewedBy = adminId;
  request.reviewedAt = new Date();
  if (decision === "reject") request.rejectionReason = reason;

  await request.save();

  if (decision === "approve") {
    await User.findByIdAndUpdate(request.artistId, { isVerified: true });
  }

  return request;
};

// ✅ 3. Khoá tài khoản nghệ sĩ
const suspendUser = async (userId, adminId, reason) => {
  return await User.findByIdAndUpdate(
    userId,
    {
      isSuspended: true,
      suspensionReason: reason,
      suspendedBy: adminId,
      suspendedAt: new Date(),
    },
    { new: true }
  );
};

// ✅ 4. Mở khoá tài khoản nghệ sĩ
const activateUser = async (userId, adminId) => {
  return await User.findByIdAndUpdate(
    userId,
    {
      isSuspended: false,
      suspensionReason: null,
      suspendedBy: null,
      suspendedAt: null,
    },
    { new: true }
  );
};

module.exports = {
  getAllUsers,
  getVerificationRequests,
  processVerificationRequest,
  suspendUser,
  activateUser,
};
