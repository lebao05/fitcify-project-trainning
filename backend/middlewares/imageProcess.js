const sharp = require('sharp');
const path = require('path');
const fs = require('fs/promises');

const processImg = ({ width = 300, height = 300, quality = 80 } = {}) => {
    return async (req, res, next) => {
        if (!req.file || !req.file.path) return next();

        const inputPath = req.file.path;
        const outputName = `${Date.now()}-${Math.round(Math.random() * 1e6)}.jpeg`;
        const outputPath = path.join(path.dirname(inputPath), outputName);

        try {
            await sharp(inputPath)
                .resize(width, height, { fit: 'cover' })
                .jpeg({ quality })
                .toFile(outputPath);

            await fs.unlink(inputPath);

            req.file.path = outputPath;
            req.file.filename = outputName;
            req.file.mimetype = 'image/jpeg';

            next();
        } catch (err) {
            next(err);
        }
    };
};
module.exports = processImg;