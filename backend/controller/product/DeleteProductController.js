const fs = require("fs");
const path = require("path");
const productModel = require("../../models/productModel");
const uploadProductPermission = require("../../helpers/permission");
const mongoose = require("mongoose");



async function DeleteProductController(req, res) {
  try {
   
    const { productId } = req.params;
  

    // Validate product existence
    const product =  productModel.findById(productId);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        error: true,
        success: false,
      });
    }

    // Delete associated images from filesystem
    const deleteFiles =  (filePaths) => {
      for (const filePath of filePaths) {
        try {
          const filePath = path.join(__dirname, '../../uploads/product-images/', imagePath.split('/').pop()); 

          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        } catch (err) {
          console.error(`Failed to delete file: ${filePath}`, err.message);
        }
      }
    };

    // Perform file cleanup
    if (product.productImage && product.productImage.length > 0) {
       deleteFiles(product.productImage);
    }

    // Delete product from database
    await productModel.findByIdAndDelete(productId);

    res.status(200).json({
      message: "Product deleted successfully",
      error: false,
      success: true,
    });
  } catch (err) {
    console.error(err); // Log the error
    res.status(500).json({
      message: err.message || "Internal Server Error",
      error: true,
      success: false,
    });
  }
}

module.exports = DeleteProductController;