const multer = require("multer");
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const userModel = require("../../models/userModel");

// Ensure the upload directory exists
const uploadDir = path.join(__dirname, "../../uploads/profile-pics/");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer to save uploaded images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Save in uploads/profile-pics directory
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
}).single("profilePic");

async function userSignUpController(req, res) {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({
        message: "Error uploading image",
        error: true,
        success: false,
      });
    }

    try {
      const { email, password, name } = req.body;

      const role = req.body?.role;

      const user = await userModel.findOne({ email });

      if (user) {
        throw new Error("User already exists.");
      }

      if (!email || !password || !name) {
        throw new Error("Please provide all required fields");
      }

      const salt = bcrypt.genSaltSync(10);
      const hashPassword = await bcrypt.hashSync(password, salt);

      if (!hashPassword) {
        throw new Error("Something went wrong");
      }
      // Construct the full URL for the profile picture
      const host = req.get('host'); // Get the host from the request
      const protocol = req.protocol; // Get the protocol (http or https)
      const profilePicUrl = req.file
        ? `${protocol}://${host}/uploads/profile-pics/${req.file.filename}`
        : "";

      // Save user data along with the profile picture path
      const payload = {
        email,
        password: hashPassword,
        name,
        profilePic: profilePicUrl,
        role: role ? role : "GENERAL",
      };

      const userData = new userModel(payload);
      const saveUser = await userData.save();

      res.status(201).json({
        data: saveUser,
        success: true,
        error: false,
        message: "User created successfully!",
      });
    } catch (err) {
      res.status(400).json({
        message: err.message,
        error: true,
        success: false,
      });
    }
  });
}

module.exports = userSignUpController;
