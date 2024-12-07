const AboutUs = require("../../models/landingPageModels/aboutUs");

async function addAboutUsController(req, res) {
  try {
    const { title, content, image } = req.body;

    if (!content) {
      throw new Error("Please provide a content");
    }

    if (!title) {
      throw new Error("Please provide a title");
    }

    if(!image) {
      throw new Error("Please provide an image")
    }

    const existingAboutUs = await AboutUs.findOne({ content });
    if (existingAboutUs) {
      throw new Error("About Us page already exists.");
    }

    const aboutUsData = new AboutUs({
      title,
      content,
      image,
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



