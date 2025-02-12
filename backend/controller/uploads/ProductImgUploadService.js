
const upload = require('../../config/multerConfidProductImgs');


// Ensure the upload directory exists

const productImageUploadService = (destination) => {
  return async (req, res, next) => {
    try {
        upload(req, res, (err) => {
        if (err) {
          return res.status(400).json({
            message: "Error uploading images",
            error: true,
            success: false,
          });
        }

        if (!req.files || req.files.length === 0) {
          return res.status(400).json({
            message: "No images uploaded",
            error: true,
            success: false,
          });
        }

        // Generate public URLs for the uploaded images
        const host = req.get('host');
        const protocol = req.protocol;
        const imgPaths = req.files.map(
          (file) => `${protocol}://${host}/alsakhra_photos/uploads/${destination}/${file.filename}`
        );

        // Attach the image paths to the request object for further use
        req.imagePaths = imgPaths;

        next(); // Proceed to the next middleware/controller
      });
    } catch (err) {
      res.status(500).json({
        message: err.message,
        error: true,
        success: false,
      });
    }
  };
};

module.exports = productImageUploadService;