const multer = require("multer");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

const generateRandomFilename = (ext) => `${crypto.randomBytes(16).toString("hex")}${ext}`;

const createUploader = ({ type, folder, mimePrefix, sizeLimitMB }) => {
  const absDir = path.resolve(__dirname, `../uploads/${folder}`);
  fs.mkdirSync(absDir, { recursive: true });

  const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, absDir),
    filename: (_req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, generateRandomFilename(ext));
    },
  });

  const fileFilter = (_req, file, cb) => {
    if (file.mimetype.startsWith(`${mimePrefix}/`)) cb(null, true);
    else cb(new Error(`Only ${type} files are allowed`), false);
  };

  return multer({
    storage,
    fileFilter,
    limits: { fileSize: sizeLimitMB * 1024 * 1024 },
  });
};

const audioUploader = createUploader({
  type: "audio",
  folder: "audios",
  mimePrefix: "audio",
  sizeLimitMB: 10,
});

const imageUploader = createUploader({
  type: "image",
  folder: "images",
  mimePrefix: "image",
  sizeLimitMB: 2,
});

const multiUploader = multer({
  storage: multer.diskStorage({
    destination: (_req, file, cb) => {
      const folder = file.mimetype.startsWith("audio/") ? "audios" : "images";
      const absDir = path.resolve(__dirname, `../uploads/${folder}`);
      fs.mkdirSync(absDir, { recursive: true });
      cb(null, absDir);
    },
    filename: (_req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, generateRandomFilename(ext));
    },
  }),
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("audio/") || file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only audio and image files are allowed"), false);
    }
  },
  limits: { fileSize: 10 * 1024 * 1024 } // 5 MB,
}).fields([
  { name: "audioFile", maxCount: 1 },
  { name: "imageFile", maxCount: 1 },
]);

module.exports = {
  audioUploader,
  imageUploader,
  multiUploader,
};
