const mongoose = require("mongoose");
const playlistSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, default: '' },
        ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        isPublic: { type: Boolean, default: true },
        imageUrl: { type: String, default: '' },
        songs: [{
            type: mongoose.Schema.Types.ObjectId, addedAt: Date,
            position: Number,
            ref: 'Song'
        }], 
        followers: [{
            type: mongoose.Schema.Types.ObjectId, addedAt: Date,
            ref: 'User'
        }],

    },
    { timestamps: true }
);
module.exports = mongoose.model('Playlist', playlistSchema);