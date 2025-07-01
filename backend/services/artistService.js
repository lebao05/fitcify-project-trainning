// services/artistService.js
const mongoose = require("mongoose");
const User = require("../models/user");
const ArtistProfile = require("../models/artistProfile");
const ArtistVerificationRequest = require("../models/artistVerificationRequest");
const Song = require('../models/song');
const ContentVerificationRequest = require('../models/contentVerificationRequest'); // your content model
const { uploadToCloudinary } = require('../services/cloudinaryService');
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
async function uploadSong({
    artistUserId,
    title,
    duration,
    audioPath,
    imagePath = null,
    albumId = null
}) {
    // 1️⃣ Upload audio
    const audioRes = await uploadToCloudinary(audioPath, 'songs', {
        resource_type: 'video', // <-- audio
        use_filename: true,
        unique_filename: true,
    });
    // 2️⃣ Upload cover art (if supplied)
    let imageUrl = '';
    if (imagePath) {
        const imgRes = await uploadToCloudinary(imagePath, 'covers');
        imageUrl = imgRes.secure_url;
    }
    const validAlbumId = mongoose.Types.ObjectId.isValid(albumId) ? albumId : null;

    // 3️⃣ Create Song doc
    const song = await Song.create({
        title,
        duration,
        artistId: artistUserId,
        albumId: validAlbumId,
        audioUrl: audioRes.secure_url,
        imageUrl,
        isApproved: false, // pending until admin approves
    });

    // 4️⃣ Attach to ArtistProfile
    await ArtistProfile.findOneAndUpdate(
        { userId: artistUserId },
        { $push: { songs: song._id } },
        { new: true, upsert: true }
    );

    // 5️⃣ Raise verification request for this song
    await ContentVerificationRequest.create({
        objectId: song._id,
        artistId: artistUserId,
        type: 'Song',
        status: 'pending',
    });

    return song;
}

module.exports = {
    submitArtistVerificationRequest, uploadSong
};