const uploadProductPermission = require("../../helpers/permission");
const productModel = require("../../models/productModel");
const categoryModel = require("../../models/categoryModel"); // Ensure categories are added first

async function UploadProductController(req, res) {
  try {
    const sessionUserId = req.userId;

    if (!uploadProductPermission(sessionUserId)) {
      throw new Error("Permission denied");
    }

    const { categoryId, ...productData } = req.body;

    // Ensure that the category exists
    const category = await categoryModel.findById(categoryId);

    if (!category) {
      throw new Error("Invalid category: Category not found");
    }

    // Check if the product already exists (based on productName and brandName)
    const existingProduct = await productModel.findOne({
      productName,
      brandName,
    });

    if (existingProduct) {
      throw new Error("Product already exists with the same name and brand");
    }

    // Create a new product with the existing category reference
    const uploadProduct = new productModel({
      ...productData,
      category: categoryId, // Use the category reference
    });

    const saveProduct = await uploadProduct.save();

    res.status(201).json({
      message: "Product uploaded successfully",
      error: false,
      success: true,
      data: saveProduct,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = UploadProductController;
