const mongoose = require("mongoose");

const addToCart = mongoose.Schema(
  {
    productId: {
      ref: "product",
      type: mongoose.Schema.Types.ObjectId,
      unique: true,
    },
    quantity: Number,
    userId: {
      ref: "users",
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
  }
);

const addToCartModel = mongoose.model("addToCart", addToCart);

module.exports = addToCartModel;
