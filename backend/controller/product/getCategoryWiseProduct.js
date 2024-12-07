const mongoose = require("mongoose");
const productModel = require("../../models/productModel");
const categoryModel = require("../../models/categoryModel");

const getCategoryWiseProduct = async (req, res) => {
  try {
    let { category = "", page = 1, limit = 10 } = req?.body;
    // const query = category ? { category } : {}; // Filter products by category if provided

    // Pagination options
    page = parseInt(page, 10);
    limit = parseInt(limit, 10);

    if (isNaN(page) || page < 1) page = 1; // Ensure page is at least 1
    if (isNaN(limit) || limit < 1) limit = 10;

    const skip = (page - 1) * limit;

    // Validate category ID
    if (category && !mongoose.Types.ObjectId.isValid(category)) {
      return res.status(400).json({
        message: "Invalid category ID",
        success: false,
        error: true,
      });
    }
    let products;

    if (category) {
      // Fetch products with pagination
      products = await productModel
        .where("category")
        .equals(category) // Apply category filter
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .exec();
      console.log("\n\n\n#########\n\n\n", products, "\n\n\n\n#####\n\n\n");
    } else {
      products = await productModel
        .find({})
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });
    }

    // Fetch and update category details for each product
    const updatedProducts = await Promise.all(
      products.map(async (product) => {
        const categoryData = await categoryModel.findById(
          product.category,
          "categoryName"
        );

        return {
          ...product._doc, // Spread the original product fields
          category: categoryData || null, // Replace the category ID with the category details
        };
      })
    );

    // Fetch total counts for each category
    const categoryCounts = await productModel.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ]);

    let query = {};
    if (category) {
      query.category = category; // Apply category filter if provided
    }
    // Total number of products for the current filter
    const totalProducts = await productModel.countDocuments(query);

    res.status(200).json({
      data: {
        products: updatedProducts,
        categoryCounts, // Array of categories with counts
        totalProducts,
        currentPage: page,
        totalPages: Math.ceil(totalProducts / limit),
      },
      message: "Products fetched successfully",
      success: true,
      error: false,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: err.message || "Internal Server Error",
      error: true,
      success: false,
    });
  }
};

module.exports = getCategoryWiseProduct;
