const Vision = require("../../models/landingPageModels/vision");
const visionImageUploadService = require('../../controller/uploads/visionImageUploadService');
const upload = require("../../config/multerConfigVision");
const path = require("path");
const fs = require("fs");

async function addVisionController(req, res) {
    try {
      const { title, description, image } = req.body;
  
      // Validate `title` and `description`
      if (!Array.isArray(title)) {
        return res.status(400).json({
          message: "title must be an array of objects with language and text",
          error: true,
          success: false,
        });
      }
      if (image) {
        const imagePath = path.join(__dirname, "../../alsakhra_photos/uploads/vision-images/", path.basename(image));
        if (!fs.existsSync(imagePath)) {
          return res.status(400).json({
            message: "The provided image does not exist in the upload folder.",
            error: true,
            success: false,
          });
        }
      }
  
      if (!Array.isArray(description) || description.some(desc => !desc.language || !desc.text)) {
        return res.status(400).json({
          message: "Description must be an array of objects with 'language' and 'text'.",
          error: true,
          success: false,
        });
      }
  
      // Create a new Vision object
      const visionData = new Vision({
        title : title ,
        description,
        image, // Optional image path (can be added through separate upload service)
      });
  
      // Save Vision to the database
      const savedVision = await visionData.save();
  
      res.status(201).json({
        data: savedVision,
        success: true,
        error: false,
        message: "Vision added successfully!",
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
