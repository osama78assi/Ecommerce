const productModel = require("../../models/productModel");
const categoryModel = require("../../models/categoryModel");

const getProductDetails = async (req, res) => {
  try {
    const { productId } = req.body;

    // Fetch the product by ID
    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        error: true,
        success: false,
      });
    }

    // Fetch the category details manually using the category ID from the product
    const category = await categoryModel.findById(product.category, "categoryName");

    // Prepare the final product data
    const productWithCategory = {
      ...product._doc, // Spread the original product fields
      category: category || null, // Replace the category ID with the category details
    };

    res.json({
      data: productWithCategory,
      message: "Product details fetched successfully",
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(500).json({
      message: err?.message || "Internal Server Error",
      error: true,
      success: false,
    });
  }
};

module.exports = getProductDetails;
