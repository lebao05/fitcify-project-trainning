// controllers/artistController.js
const artistService = require("../services/artistService");

const submitVerificationRequest = async (req, res, next) => {
    try {
        const requestDoc = await artistService.submitArtistVerificationRequest(
            req.user._id,
            req.body?.notes ?? null
        );
        res.status(201).json({
            Message: "Verification request submitted",
            Error: 0,
            Data: requestDoc,
        });
    } catch (err) {
        next(err);
    }
};


const uploadSong = async (req, res, next) => {
    try {
        const { title, duration, albumId } = req.body;

        if (!req.files?.audio) {
            return res.status(400).json({ Error: 1, Message: 'Audio file is required' });
        }
        const songDoc = await artistService.uploadSong({
            artistUserId: req.user._id,
            title,
            duration: Number(duration),
            audioPath: req.files.audio[0].path,
            imagePath: req.files?.image?.[0]?.path ?? null,
            albumId: albumId || null,
        });

        res.status(201).json({
            Message: 'Song uploaded, awaiting approval',
            Error: 0,
            Data: songDoc,
        });
    } catch (err) {
        next(err);
    }
};
module.exports = { submitVerificationRequest, uploadSong };

