// services/cloudinaryService.js
const cloudinary = require('../configs/cloudinary');
const fs         = require('fs');

async function uploadToCloudinary(filePath, folder = 'uploads', options = {}) {
  if (!filePath) return null;          // guard for “no image supplied”

  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder,                          // string folder name
      ...options                       // custom options (e.g. resource_type)
    });
    fs.existsSync(filePath) && fs.unlinkSync(filePath);
    return result;
  } catch (err) {
    fs.existsSync(filePath) && fs.unlinkSync(filePath);
    throw new Error('Upload to Cloudinary failed: ' + err.message);
  }
}

module.exports = { uploadToCloudinary };
