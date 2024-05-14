const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Create uploads directory if it doesn't exist
const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const filename = `document-${Date.now()}.${file.originalname.split('.').pop()}`
    cb(null, filename);
  },
});

// validation
const fileFilter = function (req, file, cb) {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "application/pdf"
  ) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type. Only JPEG, PNG, or PDF files are allowed."),
      false
    );
  }
};

// middleware for validating
// const validateFileCount = function (req, res, next) {
//   if (!req.files || req.files.length < 2 || req.files.length > 5) {
//     return res
//       .status(400)
//       .json({ message: "Number of files should be between 2 and 5." });
//   }
//   next();
// };

const upload = multer({ 
  storage: storage, 
  fileFilter: fileFilter,
}).array("file", 5);

module.exports = {
  upload: upload,
  // validateFileCount: validateFileCount,
};