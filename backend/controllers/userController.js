const userService = require('../services/userSevice'); // fixed typo

// Helper: error responder
const handleServiceError = (res, err, customMessages = {}) => {
    if (err.message === 'USER_NOT_FOUND') {
        return res.status(404).json({
            Error: 1,
            Message: customMessages.notFound || 'User not found',
            Data: null,
        });
    }

    if (err.message === 'EMAIL_DUPLICATE') {
        return res.status(409).json({
            Error: 1,
            Message: customMessages.duplicate || 'Email already in use',
            Data: null,
        });
    }

    return null; // fallback to next(err)
};

// GET /me/profile
const getProfileInfo = async (req, res, next) => {
    try {
        const profile = await userService.getProfileInfo(req.user.id);
        res.json({
            Error: 0,
            Message: 'Get profile info successful',
            Data: { profile },
        });
    } catch (err) {
        if (!handleServiceError(res, err)) next(err);
    }
};

// GET /me/followed-artists
const getFollowedArtists = async (req, res, next) => {
    try {
        const artists = await userService.getFollowedArtists(req.user.id);
        res.json({
            Error: 0,
            Message: 'Get followed artists successful',
            Data: { artists },
        });
    } catch (err) {
        next(err);
    }
};

// PATCH /me/profile
const updateProfileInfo = async (req, res, next) => {
    try {
        const profile = await userService.updateProfileInfo(
            req.user.id,
            req.body,
            req.file
        );
        res.json({
            Error: 0,
            Message: 'Update profile info successful',
            Data: { profile },
        });
    } catch (err) {
        if (!handleServiceError(res, err)) next(err);
    }
};

// DELETE /me/profile/avatar
const deleteProfileAvatar = async (req, res, next) => {
    try {
        const avatarUrl = await userService.deleteProfileAvatar(req.user.id);
        res.json({
            Error: 0,
            Message: 'Delete profile avatar successful',
            Data: { avatarUrl },
        });
    } catch (err) {
        if (!handleServiceError(res, err)) next(err);
    }
};

// GET /me/account
const getAccountInfo = async (req, res, next) => {
    try {
        const user = await userService.getAccountInfo(req.user.id);
        res.json({
            Error: 0,
            Message: 'Get account info successful',
            Data: { user },
        });
    } catch (err) {
        if (!handleServiceError(res, err)) next(err);
    }
};

// PATCH /me/account
const updateAccountInfo = async (req, res, next) => {
    try {
        const user = await userService.updateAccountInfo(req.user.id, req.body);
        res.json({
            Error: 0,
            Message: 'Update account info successful',
            Data: { user },
        });
    } catch (err) {
        if (!handleServiceError(res, err, {
            duplicate: 'Email already in use',
        })) next(err);
    }
};

module.exports = {
    getProfileInfo,
    getFollowedArtists,
    updateProfileInfo,
    deleteProfileAvatar,
    getAccountInfo,
    updateAccountInfo,
};
