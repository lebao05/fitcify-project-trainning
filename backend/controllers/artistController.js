const artistService = require("../services/artistService");

const uploadSong = async (req, res) => {
  try {
    const artistId = req.user._id;
    const songData = req.body;
    const audioFile = req.file;

    const newSong = await artistService.createSong(artistId, songData, audioFile);

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

module.exports = { uploadSong };
