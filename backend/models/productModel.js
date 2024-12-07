const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: [
      {
        language: { type: String, required: true },
        text: { type: String, required: true },
      },
    ],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },
    productImage: [],
    description: [
      {
        language: { type: String, required: true },
        text: { type: String, required: true },
      },
    ],
    price: {
      type: Number,
      required: true, // Ensure price is mandatory
      min: 0, // Prevent negative prices
    },
  },
  {
    timestamps: true,
  }
);

const productModel = mongoose.model("product", productSchema);

module.exports = productModel;
