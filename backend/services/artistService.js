// services/artistService.js
const User = require("../models/user");
const ArtistProfile = require("../models/artistProfile");
const ArtistVerificationRequest = require("../models/artistVerificationRequest");
const submitArtistVerificationRequest = async (userId, notes = null) => {
  // 1️⃣ Ensure the user exists
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  if (user.role == 'artist') throw new Error("User is already a verified artist");

  // 3️⃣ Block duplicate pending requests
  const duplicate = await ArtistVerificationRequest.findOne({
    userId,
    status: "pending",
  });
  if (duplicate) throw new Error("A pending request already exists");
  const request = await ArtistVerificationRequest.create({
    userId,
    notes,
    status: "pending",
    submittedAt: new Date(),
  });

  return request;
};

module.exports = {
  submitArtistVerificationRequest,
};
