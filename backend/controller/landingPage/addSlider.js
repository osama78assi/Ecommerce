const Slider = require("../../models/landingPageModels/slider");
const upload = require("../../config/multerConfig");
const uploadProductPermission = require("../../helpers/permission");
const multer = require('multer');

async function addSliderController(req, res) {
  try {
    const { id, desc, imgPath } = req.body;

    if (!Array.isArray(desc)) {
      return res.status(400).json({
        message: "Desc must be an array of objects with language and text",
        error: true,
        success: false,
      });
    }

    const existingSlider = await Slider.findOne({ id });
    if (existingSlider) {
      throw new Error("Slider with this ID already exists.");
    }

    const sliderData = new Slider({
      id,
      desc,
      img: imgPath,
    });

    const savedSlider = await sliderData.save();

    res.status(201).json({
      data: savedSlider,
      success: true,
      error: false,
      message: "Slider added successfully!",
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