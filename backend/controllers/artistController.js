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


module.exports = { submitVerificationRequest };