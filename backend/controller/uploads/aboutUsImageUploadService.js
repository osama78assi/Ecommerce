// services/visionImageUploadService.js
const upload = require('../../config/multerConfigAboutUs');

const visionImageUploadService = (destination) => {
    return async (req, res) => {
      try {
        await upload(req, res, (err) => {
          if (err) {
            return res.status(400).json({
              message: "Error uploading image",
              error: true,
              success: false,
            });
          }
  
          if (req.file) {
            const host = req.get('host'); 
            const protocol = req.protocol;
            const imgPath = `${protocol}://${host}/uploads/${destination}/${req.file.filename}`;
  
            return res.status(200).json({
              imgPath,
              success: true,
              error: false,
              message: "Image uploaded successfully!",
            });
          } else {
            return res.status(400).json({
              message: "No image uploaded",
              error: true,
              success: false,
            });
          }
        });
      } catch (err) {
        res.status(400).json({
          message: err.message,
          error: true,
          success: false,
        });
      }
    };
  };
  
  module.exports = visionImageUploadService; 
