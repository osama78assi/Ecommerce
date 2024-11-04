const multer = require('multer');
const path = require("path");
const fs = require("fs");
const uploadProductPermission = require("../../helpers/permission");
const productModel = require("../../models/productModel");
const categoryModel = require("../../models/categoryModel");

// Ensure the upload directory exists
const uploadDir = path.join(__dirname, "../../uploads/product-images");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer to store the uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // Get the file extension
    const uniqueName = `${Date.now()}_${Math.round(Math.random() * 1e9)}${ext}`; // Generate a unique name
    cb(null, uniqueName);
  },
});

// Setup multer with a file size limit and multiple file handling
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit the size to 5MB
}).array('productImage', 5);


async function UploadProductController(req, res) {
  try {
    const sessionUserId = req.userId;

    // Check permission
    if (!uploadProductPermission(sessionUserId)) {
      return res.status(403).json({
        message: "Permission denied",
        error: true,
        success: false,
      });
    }

    // Handle file upload using multer
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          message: err.message,
          error: true,
          success: false,
        });
      }

      const { categoryId, productName, description, price, sellingPrice } = req.body;

      // Ensure that the category exists
      const category = await categoryModel.findById(categoryId);
      if (!category) {
        return res.status(400).json({
          message: "Invalid category: Category not found",
          error: true,
          success: false,
        });
      }

      // Ensure images are uploaded
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({
          message: "No images uploaded",
          error: true,
          success: false,
        });
      }

      // Get uploaded image paths
      const productImages = req.files.map(file => file.path);

      // Create a new product
      const newProduct = new productModel({
        productName,
        category,
        description,
        price,
        sellingPrice,
        productImage: productImages,
      });

      const savedProduct = await newProduct.save();

      res.status(201).json({
        message: "Product uploaded successfully",
        error: false,
        success: true,
        data: savedProduct,
      });
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

module.exports = UploadProductController;
