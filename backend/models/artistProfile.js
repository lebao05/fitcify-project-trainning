const mongoose = require('mongoose');

const artistProfileSchema = new mongoose.Schema({
  userId:        { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  isVerified:    { type: Boolean, default: false },
  bio:           { type: String, default: '' },
  albums:        [{ type: mongoose.Schema.Types.ObjectId, ref: 'Album' }],
  songs:         [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
  socialLinks:   {
    spotify:   String,
    instagram: String,
    twitter:   String,
    website:   String
  }
},{
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

module.exports = mongoose.model('ArtistProfile', artistProfileSchema);
