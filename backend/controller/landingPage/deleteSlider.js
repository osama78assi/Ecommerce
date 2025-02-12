const Slider = require("../../models/landingPageModels/slider");
const fs = require("fs"); // Required for deleting the uploaded image
const path = require("path");


async function deleteSliderController(req, res) {
  try {
    const sliderId = req.params.id; // Get the slider ID from the request URL

    // Check if the slider ID is provided
    if (!sliderId) {
      throw new Error("Please provide a slider ID to delete.");
    }

    // Find the slider by ID
    const sliderToDelete = await Slider.findById(sliderId);

    // Check if the slider exists
    if (!sliderToDelete) {
      return res.status(404).json({
        message: "Slider not found",
        error: true,
        success: false,
      });
    }

    // Get the image path to be deleted (if it exists)
    const imagePath = sliderToDelete.img;

    // Delete the slider document from the database
    await Slider.findByIdAndDelete(sliderId);

    // If an image path exists, delete the uploaded image
    if (imagePath) {
      const filePath = path.join(__dirname, '../../alsakhra_photos/uploads/slider-images/', imagePath.split('/').pop()); 
      console.log(filePath);
      // Adjust the relative path as needed
      try {
        fs.unlinkSync(filePath);
        console.log("Image deleted successfully:", filePath);
      } catch (error) {
        console.error("Error deleting image:", error, filePath);
      }
    }
    res.status(200).json({
      message: "Slider deleted successfully",
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

module.exports = deleteSliderController;
