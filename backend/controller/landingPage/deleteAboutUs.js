const AboutUs = require("../../models/landingPageModels/aboutUs");
const path = require("path");
const fs = require("fs");

async function deleteAboutUsController(req, res) {
  try {
    const { id } = req.params; // Get the ID of the AboutUs document to delete

    // Validate if the ID is provided
    if (!id) {
      return res.status(400).json({
        message: "ID parameter is required.",
        error: true,
        success: false,
      });
    }

    // Find the document by ID and delete it
    const deletedAboutUs = await AboutUs.findByIdAndDelete(id);

    // Get the image path to be deleted (if it exists)
    const imagePath = deletedAboutUs.image;

    // If an image path exists, delete the uploaded image
    if (imagePath) {
      const filePath = path.join(
        __dirname,
        "../../alsakhra_photos/uploads/aboutus-images/",
        imagePath.split("/").pop()
      ); // Adjust the relative path as needed
      try {
        fs.unlinkSync(filePath);
        console.log("Image deleted successfully:", filePath);
      } catch (error) {
        console.error("Error deleting image:", error, filePath);
        // You can optionally send an error response here if image deletion fails
      }
    }

    // If the document doesn't exist, return a 404 error
    if (!deletedAboutUs) {
      return res.status(404).json({
        message: "About Us entry not found.",
        error: true,
        success: false,
      });
    }

    // Successful deletion response
    res.status(200).json({
      message: "About Us entry deleted successfully.",
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(500).json({
      message:
        err.message || "An error occurred while deleting About Us entry.",
      error: true,
      success: false,
    });
  }
}

module.exports = deleteAboutUsController;
