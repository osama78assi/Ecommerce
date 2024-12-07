const productModel = require("../../models/productModel");

const searchProduct = async (req, res) => {
  try {
    const query = req.query.q;

    console.log("\n\n\n", `.*${query}.*`, "\n\n\n");
    const regex = new RegExp(query, "i");

    const product = await productModel.find({
      productName: {
        $elemMatch: {
          text: { $regex: regex }, // Match all occurrences of the regex in the `text` field
        },
      },
    });

    console.log("\n\n\n", query, "\n\n\n");

    res.json({
      data: product,
      message: "Search Product list",
      error: false,
      success: true,
    });
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = searchProduct;
