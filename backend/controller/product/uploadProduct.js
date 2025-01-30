const productModel = require("../../models/productModel");
const categoryModel = require("../../models/categoryModel");
const uploadProductPermission = require("../../helpers/permission");

async function UploadProductController(req, res) {
  try {
    const sessionUserId = req.userId;

    // Check permission
    if (!uploadProductPermission(sessionUserId)) {
      return res.status(403).json({
        message: "Permission denied",
        error: true,
        success: false,
      });
    }

    // Extract data from the request body
    const { name, category: categoryId, description, price, productImage } = req.body;

    // Validate the category
    const category = await categoryModel.findById(categoryId);
    if (!category) {
      return res.status(400).json({
        message: "Invalid category: Category not found",
        error: true,
        success: false,
      });
    }

    // Ensure that imgPaths is an array of strings

    // Create a new product with the provided data
    const newProduct = new productModel({
      name: name , // Parse JSON string to array
      category: category._id, // Use category ID
      description: description, // Parse JSON string to array
      price: price, // Convert price to a number
      productImage: productImage // Use the image URLs
    });

    const savedProduct = await newProduct.save();

    res.status(201).json({
      message: "Product uploaded successfully",
      error: false,
      success: true,
      data: savedProduct,
    });
  } catch (err) {
    console.error("Error in UploadProductController:", err);
    res.status(500).json({
      message: err.message || "Internal Server Error",
      error: true,
      success: false,
    });
  }
}

module.exports = UploadProductController;