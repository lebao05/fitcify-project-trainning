const artistService = require("../services/artistService");

const uploadSong = async (req, res) => {
  try {
    const artistId = req.user._id;
    const songData = req.body;

    const audioFile = req.files?.audioFile?.[0];
    const imageFile = req.files?.imageFile?.[0]; // optional

    const newSong = await artistService.createSong(artistId, songData, audioFile, imageFile);

    res.status(201).json({
      Error: 0,
      Message: "Song uploaded successfully",
      Data: newSong,
    });
  } catch (err) {
    res.status(500).json({
      Error: 1,
      Message: err.message || "Internal server error",
    });
  }
};

const deleteSong = async (req, res) => {
  try {
    const songId = req.params.songId;
    const artistId = req.user._id;

    await artistService.deleteSong(songId, artistId);

    res.status(200).json({
      Error: 0,
      Message: "Song deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      Error: 1,
      Message: err.message || "Internal server error",
    });
  }
}

module.exports = { uploadSong, deleteSong };
