const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    categoryName: [{
        language: { type: String, required: true },
        text: { type: String, required: true },
      }],
  },
  {
    timestamps: true,
  }
);

const categoryModel = mongoose.model("category", categorySchema);

module.exports = categoryModel;
