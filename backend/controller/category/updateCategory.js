const uploadProductPermission = require("../../helpers/permission");
const categoryModel = require("../../models/categoryModel");

async function updateCategoryController(req, res) {
  try {
    const sessionUserId = req.userId;

    if (!uploadProductPermission(sessionUserId)) {
      throw new Error("Permission denied");
    }

    const { categoryId, categoryName } = req.body;

    // Find the category by ID
    const category = await categoryModel.findById(categoryId);

    if (!category) {
      throw new Error("Category not found");
    }

    category.categoryName = categoryName;

    const updatedCategory = await category.save();

    res.status(200).json({
      message: "Category updated successfully",
      error: false,
      success: true,
      data: updatedCategory,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = updateCategoryController;
