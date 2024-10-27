const uploadProductPermission = require("../../helpers/permission");
const categoryModel = require("../../models/categoryModel");






async function addCategoryController(req, res) {
  try {
    const sessionUserId = req.userId;

    if (!uploadProductPermission(sessionUserId)) {
      throw new Error("Permission denied");
    }

    // Extract and validate category data from request body
    const { categoryName, description } = req.body;

    const newCategory = new categoryModel({ categoryName, description });

    const validationError = newCategory.validateSync();
    if (validationError) {
      const errors = validationError.errors.map(err => err.message);
      throw new Error(`Validation failed: ${errors.join(', ')}`);
    }

    // Check for duplicate category name
    const existingCategory = await categoryModel.findOne({ categoryName });
    if (existingCategory) {
      throw new Error("A category with this name already exists");
    }

    // Save the new category
    const savedCategory = await newCategory.save();

    res.status(201).json({
      message: "Category created successfully",
      error: false,
      success: true,
      data: savedCategory,
    });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = addCategoryController;