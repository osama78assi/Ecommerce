const uploadProductPermission = require("../../helpers/permission");
const categoryModel = require("../../models/categoryModel"); // The Category model

async function uploadCategoryController(req, res) {
  try {
    const sessionUserId = req.userId;
    if (!uploadProductPermission(sessionUserId)) {
      throw new Error("Permission denied");
    }

    const { categoryName } = req.body;

    let existingCategory = false;

    // Check for duplicate category names
    for (let i = 0; i < 3; ++i) {
      const isExist = await categoryModel.findOne({
        categoryName: {
          $elemMatch: { text: categoryName[i].text },
        },
      });
      existingCategory = existingCategory || isExist;
    }

    if (existingCategory) {
      throw new Error("Category already exists");
    }

    // Create a new category
    const newCategory = new categoryModel({
      categoryName,
    });

    const savedCategory = await newCategory.save();

    res.status(201).json({
      message: "Category uploaded successfully",
      error: false,
      success: true,
      data: savedCategory,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = uploadCategoryController;
