
const Vision = require("../../models/landingPageModels/vision");
const fs = require("fs"); // Required for deleting the uploaded image
const path = require("path");

async function deleteVisionController(req, res) {
  try {
    const visionId = req.params.visionId; // Get the vision ID from the request URL

    // Check if the vision ID is provided
    if (!visionId) {
      throw new Error("Please provide a vision ID to delete.");
    }

    // Find the vision by ID
    const visionToDelete = await Vision.findById(visionId);

    // Check if the vision exists
    if (!visionToDelete) {
      return res.status(404).json({
        message: "Vision not found",
        error: true,
        success: false,
      });
    }

    // Get the image path to be deleted (if it exists)
    const imagePath = visionToDelete.image;

    // Delete the vision document from the database
    await Vision.findByIdAndDelete(visionId);

    // If an image path exists, delete the uploaded image
    if (imagePath) {
      const filePath = path.join(__dirname, '../../alsakhra_photos/uploads/vision-images/', imagePath.split('/').pop()); // Adjust the relative path as needed
      try {
        fs.unlinkSync(filePath);
        console.log("Image deleted successfully:", filePath);
      } catch (error) {
        console.error("Error deleting image:", error, filePath);
        // You can optionally send an error response here if image deletion fails
      }
    }

    res.status(200).json({
      message: "Vision deleted successfully",
      success: true,
      error: false,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = deleteVisionController;