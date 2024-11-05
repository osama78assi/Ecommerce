const Goal = require("../../models/landingPageModels/goal");

async function deleteGoalController(req, res) {
  try {
    const goalId = req.params.id; // Get the goal ID from the request URL

    // Check if the goal ID is provided
    if (!goalId) {
      throw new Error("Please provide a goal ID to delete.");
    }

    // Find the goal by ID
    const goalToDelete = await Goal.findById(goalId);

    // Check if the goal exists
    if (!goalToDelete) {
      return res.status(404).json({
        message: "Goal not found",
        error: true,
        success: false,
      });
    }

    // Delete the goal document from the database
    await Goal.findByIdAndDelete(goalId);

    res.status(200).json({
      message: "Goal deleted successfully",
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

module.exports = deleteGoalController;