// models/songVerificationRequest.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * SongVerificationRequest
 *  – Raised by an artist to verify a specific song (e.g. copyright proof, ownership).
 */
const contentVerificationRequestSchema = new Schema({
    objectId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    artistId: {
        type: Schema.Types.ObjectId,
        ref: 'User',          // or 'Artist'
        required: true,
    },
    type: {
        type: String,
        enum: ['Song', 'Album'],
        required: true,
    }
    ,
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending',
    },
    documents: [{
        type: String,
    }],
    submittedAt: {
        type: Date,
        default: Date.now,
    },
    processedAt: Date,
    processedBy: {
        type: Schema.Types.ObjectId,
        ref: 'Admin',
    },
    notes: String,
});

module.exports = mongoose.model(
    'contentVerificationRequest',
    contentVerificationRequestSchema
);
