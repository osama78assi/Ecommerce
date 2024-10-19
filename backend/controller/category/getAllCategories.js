const categoryModel = require("../../models/categoryModel");

async function getAllCategoriesController(req, res) {
  try {
    // Retrieve all categories from the database
    const categories = await categoryModel.find({});

    // Check if any categories were found
    if (!categories || categories.length === 0) {
      return res.status(200).json({
        message: "No categories found",
        error: false,
        success: true,
        data: [],
      });
    }

    // Respond with the retrieved categories
    res.status(200).json({
      message: "Categories retrieved successfully",
      error: false,
      success: true,
      data: categories,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || "An error occurred while retrieving categories",
      error: true,
      success: false,
    });
  }
}

module.exports = getAllCategoriesController;
