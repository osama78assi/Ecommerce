const Goal = require("../../models/landingPageModels/goal");

async function addGoalController(req, res) {
  const { title, description } = req.body;

  try {
    // Validate input
    if (!title || !description) {
      return res.status(400).json({
        message: "Please provide all required fields (title, description)",
        error: true,
        success: false,
      });
    }

    // Check if goal with this title already exists
    const existingGoal = await Goal.findOne({ title });
    if (existingGoal) {
      return res.status(409).json({
        message: "Goal with this title already exists.",
        error: true,
        success: false,
      });
    }

    // Create new goal
    const goalData = new Goal({ title, description });

    // Save the goal to the database
    const savedGoal = await goalData.save();

    // Send success response
    res.status(201).json({
      data: savedGoal,
      success: true,
      error: false,
      message: "Goal added successfully!",
    });
  } catch (err) {
    console.error(err); // Log error for debugging
    res.status(500).json({
      message: "Internal server error. Please try again later.",
      error: true,
      success: false,
    });
  }
}

module.exports = addGoalController;
