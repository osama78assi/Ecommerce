const addToCartModel = require("../../models/cartProduct");
const CategoryModel = require("../../models/categoryModel"); // Assuming this is your category model

const addToCartViewProduct = async (req, res) => {
  try {
    const currentUser = req.userId;

    // Fetch cart products and populate productId
    const allProducts = await addToCartModel.find({
      userId: currentUser,
    }).populate("productId");

    // Fetch category details for each product and replace the category ID with full details
    const result = await Promise.all(
      allProducts.map(async (cartItem) => {
        const categoryId = cartItem.productId.category;

        // Query the category data based on categoryId
        const categoryData = await CategoryModel.findById(categoryId);

        // Replace category ID with category details
        cartItem.productId.category = categoryData;

        return cartItem;
      })
    );

    res.json({
      data: result,
      success: true,
      error: false,
    });
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = addToCartViewProduct;
