const mm = require("music-metadata");
const { uploadToCloudinary } = require("./cloudinaryService");
const fs = require("fs");
const Song = require("../models/song");
const ArtistProfile = require("../models/artistProfile");
const mongoose = require("mongoose");
const extractCloudinaryPublicId = require("../helpers/cloudinaryPublicID");
const cloudinary = require("../configs/cloudinary");

const createSong = async (artistId, songData, audioFile, imageFile) => {
  if (!songData.title || !audioFile || !audioFile.path) {
    throw new Error("Missing title or audio file");
  }

  const filePath = audioFile.path;

  const metadata = await mm.parseFile(filePath);
  const duration = Math.floor(metadata.format.duration || 0);

  const audioResult = await uploadToCloudinary(filePath, "fitcify/songs", "video");
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }

  let imageUrl = "";
  if (imageFile && imageFile.path) {
    const imageResult = await uploadToCloudinary(imageFile.path, "fitcify/song-covers", "image");
    imageUrl = imageResult.secure_url;

    if (fs.existsSync(imageFile.path)) {
      fs.unlinkSync(imageFile.path);
    }
  }

  let albumId = null;
  if (songData.albumId && mongoose.Types.ObjectId.isValid(songData.albumId)) {
    albumId = songData.albumId;
  }

  const newSong = new Song({
    title: songData.title,
    duration,
    artistId,
    albumId,
    audioUrl: audioResult.secure_url,
    imageUrl, 
    playCount: 0,
    isApproved: false,
    uploadedAt: new Date()
  });

  await newSong.save();

  const artistProfile = await ArtistProfile.findOne({ userId: artistId });
  if (artistProfile) {
    artistProfile.songs.push(newSong._id);
    await artistProfile.save();
  }

  return newSong;
};

const deleteSong = async (songId, artistId) => {
  if (!mongoose.Types.ObjectId.isValid(songId)) {
    throw new Error("Invalid song ID");
  }

  const song = await Song.findById(songId);
  if (!song) {
    throw new Error("Song not found");
  }

  if (song.artistId.toString() !== artistId.toString()) {
    throw new Error("Unauthorized: You do not own this song");
  }

  const audioPublicId = extractCloudinaryPublicId(song.audioUrl);
  console.log(audioPublicId)
  if (audioPublicId) {
    await cloudinary.uploader.destroy(audioPublicId, { resource_type: "video" });
  }

  const imagePublicId = extractCloudinaryPublicId(song.imageUrl);
  console.log(imagePublicId)
  if (imagePublicId) {
    await cloudinary.uploader.destroy(imagePublicId, { resource_type: "image" });
  }

  await ArtistProfile.updateOne(
    { userId: artistId },
    { $pull: { songs: song._id } }
  );

  await song.deleteOne();

  return true;
};


module.exports = {
  createSong,
  deleteSong,
};