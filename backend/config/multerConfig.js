const multer = require('multer');
const path = require("path");
const fs = require("fs");


const uploadDir = path.join(__dirname, "../alsakhra_photos/uploads/slider-images/");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer to save uploaded images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Save in uploads/slider-images directory
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // Get the file extension
    const uniqueName = `${Date.now()}_${Math.round(Math.random() * 1e9)}${ext}`; // Generate a unique name using timestamp and random number
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit the size to 5MB
}).single("sliderImg");
// Export the upload middleware function
module.exports = upload; // Single file upload for "profilePic" field