const Vision = require("../../models/landingPageModels/aboutUs");

async function deleteAboutUsController(req, res) {
  try {
    const visionId = req.params.id; // Get the vision ID from the request URL

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

    // Delete the vision document from the database
    await Vision.findByIdAndDelete(visionId);

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

module.exports = deleteAboutUsController;