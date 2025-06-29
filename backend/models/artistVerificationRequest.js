const mongoose = require('mongoose');
const { Schema } = mongoose;

const artistVerificationRequestSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  status: {
    type: String,
    enum: ['pending','approved','rejected'],
    default: 'pending'
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  processedAt: Date,
  processedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'  // admin user
  },
  notes: String
});

module.exports = mongoose.model('ArtistVerificationRequest', artistVerificationRequestSchema);
