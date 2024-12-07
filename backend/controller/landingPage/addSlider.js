const Slider = require("../../models/landingPageModels/slider");


async function addSliderController(req, res) {
  try {
    const { title, description, imgPath } = req.body;

    if (!Array.isArray(description)) {
      return res.status(400).json({
        message: "Desc must be an array of objects with language and text",
        error: true,
        success: false,
      });
    }

    if (!Array.isArray(title)) {
      return res.status(400).json({
        message: "Desc must be an array of objects with language and text",
        error: true,
        success: false,
      });
    }

    const sliderData = new Slider({
      description,
      img: imgPath,
      title,
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