const Slider = require("../../../models/landingPageModels/slider");

async function getAllSlidersController(req, res) {
  try {
    // Retrieve all sliders from the database
    const sliders = await Slider.find();

    // Check if there are any sliders
    if (!sliders.length) {
      return res.status(404).json({
        message: "No sliders found",
        error: true,
        success: false,
      });
    }

    // Return the sliders
    res.status(200).json({
      data: sliders,
      success: true,
      error: false,
      message: "Sliders retrieved successfully!",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      error: true,
      success: false,
    });
  }
}

module.exports = getAllSlidersController;
