const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
      unique: true,
    },
    description: String,
  },
  {
    timestamps: true,
  }
);

const categoryModel = mongoose.model("category", categorySchema);

module.exports = categoryModel;
