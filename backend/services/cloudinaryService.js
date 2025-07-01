const cloudinary = require('../configs/cloudinary');
const fs = require('fs');

const uploadToCloudinary = async (filePath, folder = 'uploads', resourceType = 'auto') => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: folder,
      resource_type : resourceType,
    });
    // fs.unlinkSync(filePath);
    return result;
  } catch (err) {
    throw new Error('Upload to Cloudinary failed: ' + err.message);
  }
};

module.exports = { uploadToCloudinary };
