// services/artistService.js
const mongoose = require("mongoose");
const User = require("../models/user");
const ArtistProfile = require("../models/artistProfile");
const ArtistVerificationRequest = require("../models/artistVerificationRequest");
const Song = require('../models/song');
const ContentVerificationRequest = require('../models/contentVerificationRequest'); // your content model
const { uploadToCloudinary } = require('../services/cloudinaryService');
const cloudinary = require("../configs/cloudinary");
const extractCloudinaryPublicId = require('../helpers/extractPublicId');
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
async function updateSong(
    songId,
    artistUserId,
    { title, duration, albumId = null, audioPath = null, imagePath = null }
) {
    const song = await Song.findById(songId);
    if (!song) throw new Error('Song not found');
    if (!song.artistId.equals(artistUserId))
        throw new Error('You do not have permission to modify this song');

    const updates = {};
    if (title) updates.title = title;
    if (duration) updates.duration = duration;
    if (albumId && mongoose.Types.ObjectId.isValid(albumId))
        updates.albumId = albumId;

    let assetReplaced = false;

    /* 2️⃣ Replace audio */
    if (audioPath) {
        // destroy old audio (resource_type: 'video')
        const oldAudioId = extractCloudinaryPublicId(song.audioUrl);
        if (oldAudioId) await cloudinary.uploader.destroy(oldAudioId, { resource_type: 'video' });

        const audioRes = await uploadToCloudinary(audioPath, 'songs', {
            resource_type: 'video',
            use_filename: true,
            unique_filename: true,
        });
        updates.audioUrl = audioRes.secure_url;
        assetReplaced = true;
    }

    /* 3️⃣ Replace image */
    if (imagePath) {
        const oldImgId = extractCloudinaryPublicId(song.imageUrl);
        if (oldImgId) await cloudinary.uploader.destroy(oldImgId, { resource_type: 'image' });
        const imgRes = await uploadToCloudinary(imagePath, 'covers');
        updates.imageUrl = imgRes.secure_url;
        assetReplaced = true;
    }
    return await Song.findByIdAndUpdate(songId, updates, { new: true });
}
module.exports = {
    submitArtistVerificationRequest, uploadSong, updateSong
};

