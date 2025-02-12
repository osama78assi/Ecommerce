const multer = require("multer");
const path = require("path");
const fs = require("fs");
const userModel = require("../../models/userModel");

// Ensure the upload directory exists
const uploadDir = path.join(__dirname, "../../alsakhra_photos/uploads/profile-pics/");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer to handle profile picture uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Save in uploads/profile-pics directory
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // Get the file extension
    const uniqueName = `${Date.now()}_${Math.round(Math.random() * 1e9)}${ext}`; // Generate a unique name
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit size to 5MB
}).single("profilePic");

async function changeProfilePic(req, res) {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({
        message: "Error uploading image.",
        error: true,
        success: false,
      });
    }

    try {
      const sessionUser = req.userId; // The currently logged-in user
      const host = req.get("host"); // Get the host from the request
      const protocol = req.protocol; // Get the protocol (http or https)

      // Find the user to retrieve the old profile picture
      const user = await userModel.findById(sessionUser);
      if (!user) {
        throw new Error("User not found.");
      }

      // Save the old profile picture path
      const oldPicPath = user.profilePic ? path.join(__dirname, "../../alsakhra_photos/uploads", user.profilePic.split(host)[1]) : null;

      console.log("OLD PATH: ", oldPicPath, "\n\n\n")

      // Construct the new profile picture URL
      const newProfilePicUrl = req.file
        ? `${protocol}://${host}/alsakhra_photos/uploads/profile-pics/${req.file.filename}`
        : "";

      // Update the user's profile picture in the database
      const updatedUser = await userModel.findByIdAndUpdate(
        sessionUser,
        { profilePic: newProfilePicUrl },
        { new: true }
      );

      // After successfully updating the user, delete the old profile picture
      if (oldPicPath && fs.existsSync(oldPicPath)) {
        fs.unlinkSync(oldPicPath); // Delete the old picture
      }

      res.status(200).json({
        message: "Profile picture updated successfully.",
        data: updatedUser,
        success: true,
        error: false,
      });
    } catch (err) {
      res.status(400).json({
        message: err.message || err,
        success: false,
        error: true,
      });
    }
  });
}

module.exports = changeProfilePic;
