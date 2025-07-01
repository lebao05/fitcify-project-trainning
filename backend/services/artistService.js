const mm = require("music-metadata");
const { uploadToCloudinary } = require("./cloudinaryService");
const fs = require("fs");
const Song = require("../models/song");
const ArtistProfile = require("../models/artistProfile");
const mongoose = require("mongoose");

const createSong = async (artistId, songData, audioFile) => {
  if (!songData.title || !audioFile || !audioFile.path) {
    throw new Error("Missing title or audio file");
  }

  const filePath = audioFile.path;

  const metadata = await mm.parseFile(filePath);
  const duration = Math.floor(metadata.format.duration || 0);
  console.log(duration)


  const audioResult = await uploadToCloudinary(filePath, "fitcify/songs", "video");


  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
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
    imageUrl: "",
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

module.exports = {
  createSong,
};