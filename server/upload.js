const multer = require("multer");

module.exports = multer({
  storage: multer.memoryStorage(),
  fileFilter: (_, file, cb) => {
    const allowed = /jpeg|jpg|png|webp/;
    cb(null, allowed.test(file.mimetype));
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});
