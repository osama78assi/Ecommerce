const Slider = require("../../models/landingPageModels/slider");
const upload = require("../../config/multerConfig");
const uploadProductPermission = require("../../helpers/permission");
const multer = require('multer');



async function addSliderController(req, res) {
  try {
   
    // Await the upload completion
    await upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          message: "Error uploading image",
          error: true,
          success: false,
        });
      }
           
      const { id, desc } =   req.body;
      
      if (req.file) {
        const host = req.get('host'); 
        const protocol = req.protocol;
        const img = `${protocol}://${host}../uploads/slider-images/${req.file.filename}`;

        

        
       
        const existingSlider = await Slider.findOne({ id });
        if (existingSlider) {
          throw new Error("Slider with this ID already exists.");
        }

        const sliderData = new Slider({
          id,
          desc,
          img,
        });

        const savedSlider = await sliderData.save();

        res.status(201).json({
          data: savedSlider,
          success: true,
          error: false,
          message: "Slider added successfully!",
        });
      } else {
        // Handle no file uploaded case (optional)
        res.status(400).json({
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
}

module.exports = addSliderController;