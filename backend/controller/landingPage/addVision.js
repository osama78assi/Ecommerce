const Vision = require("../../models/landingPageModels/vision");
const upload = require("../../config/multerConfigVision"); // Assuming a separate Multer config

async function addVisionController(req, res) {
  try {
    // Await the upload completion
    await upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          message: "Error uploading image",
          error: true,
          success: false,
        });
      }

      const { title, description } = req.body;

      if (!title || !description) {
        throw new Error("Please provide all required fields (title, description)");
      }

      if (req.file) {
        const host = req.get('host'); 
        const protocol = req.protocol;
        const img = `${protocol}://${host}../uploads/vision-images/${req.file.filename}`; // Assuming a vision-images directory

        const existingVision = await Vision.findOne({ title });
        if (existingVision) {
          throw new Error("Vision with this title already exists.");
        }

        const visionData = new Vision({
          title,
          description,
          image: img,
        });

        const savedVision = await visionData.save();

        res.status(201).json({
          data: savedVision,
          success: true,
          error: false,
          message: "Vision added successfully!",
        });
      } else {
        // Handle no file uploaded case (optional)
        res.status(400).json({
          message: "No image uploaded",
          error: true,
          success: false,
        });
      }
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
      error: true,
      success: false,
    });
  }
}

module.exports = addVisionController;