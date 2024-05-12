const multer = require('multer');
const path = require('path');

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') 
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

// validation
const fileFilter = function (req, file, cb) {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only JPEG, PNG, or PDF files are allowed.'), false);
    }
}

// middleware for validating 
const validateFileCount = function (req, res, next) {
    if (!req.files || req.files.length < 2 || req.files.length > 5) {
        return res.status(400).json({ message: "Number of files should be between 2 and 5." });
    }
    next();
}

module.exports = {
    upload: multer({ storage: storage, fileFilter: fileFilter }),
    validateFileCount: validateFileCount
};

