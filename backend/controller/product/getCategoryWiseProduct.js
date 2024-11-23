const productModel = require("../../models/productModel");

const getCategoryWiseProduct = async (req, res) => {
  try {
    let { category = "", page = 1, limit = 10 } = req?.body;
    const query = category ? { category } : {}; // Filter products by category if provided

    // Pagination options
    page = parseInt(page, 10);
    limit = parseInt(limit, 10);

    if (isNaN(page) || page < 1) page = 1; // Ensure page is at least 1
    if (isNaN(limit) || limit < 1) limit = 10;

    const skip = (page - 1) * limit;

    // Fetch products with pagination
    const products = await productModel
      .find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    // Fetch total counts for each category
    const categoryCounts = await productModel.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ]);

    // Total number of products for the current filter
    const totalProducts = await productModel.countDocuments(query);

    res.status(200).json({
      data: {
        products,
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
