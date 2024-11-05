const AboutUs = require("../../models/landingPageModels/aboutUs");

async function addAboutUsController(req, res) {
  try {
    const { description } = req.body;

    if (!description) {
      throw new Error("Please provide a description");
    }

    const existingAboutUs = await AboutUs.findOne({ description });
    if (existingAboutUs) {
      throw new Error("About Us page already exists.");
    }

    const aboutUsData = new AboutUs({
      description,
    });

    const savedAboutUs = await aboutUsData.save();

    res.status(201).json({
      data: savedAboutUs,
      success: true,
      error: false,
      message: "About Us page added successfully!",
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
      error: true,
      success: false,
    });
  }

}

module.exports = addAboutUsController;



