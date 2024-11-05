const Goal = require("../../../models/landingPageModels/goal");

async function getGoalsController(req, res) {
  try {
    const goals = await Goal.find(); // Fetch all goals from the database

    res.status(200).json({
      data: goals,
      success: true,
      error: false,
      message: "Goals fetched successfully!",
    });
  } catch (err) {
    res.status(500).json({
      message: "An error occurred while fetching goals.",
      error: true,
      success: false,
    });
  }
}

module.exports = getGoalsController;