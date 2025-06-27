const mongoose = require("mongoose");
const albumSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        artistId: { type: mongoose.Schema.Types.ObjectId, ref: 'Artist', required: true },
        songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
        releaseDate: { type: Date },
        imageUrl: { type: String, default: '' },
        totalDuration: { type: Number, default: 0 },
    },
    { timestamps: true }
);
module.exports = mongoose.model('Album', albumSchema);