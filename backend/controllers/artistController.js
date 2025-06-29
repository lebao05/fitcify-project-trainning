const artistService = require('../services/artistService');

exports.getAllArtistVerificationRequests = async (req, res) => {
  try {
    const data = await artistService.getAllArtistVerificationRequests();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.approveArtistRequest = async (req, res) => {
  try {
    const result = await artistService.approveArtistRequest(req.params.id, req.user._id);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.rejectArtistRequest = async (req, res) => {
  try {
    const result = await artistService.rejectArtistRequest(req.params.id, req.user._id);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.suspendArtist = async (req, res) => {
  try {
    const result = await artistService.suspendArtist(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.activateArtist = async (req, res) => {
  try {
    const result = await artistService.activateArtist(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
