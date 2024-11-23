const AboutUs = require("../../models/landingPageModels/aboutUs");

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
      message: err.message || "An error occurred while deleting About Us entry.",
      error: true,
      success: false,
    });
  }
}

module.exports = deleteAboutUsController;