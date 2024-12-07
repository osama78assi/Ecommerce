const mongoose = require("mongoose");

const aboutUsSchema = new mongoose.Schema({
  title: [
    {
      language: { type: String, required: true },
      text: { type: String, required: true },
    },
  ],
  content: [
    {
      language: { type: String, required: true },
      text: { type: String, required: true },
    },
  ],
  image: { type: String, required: true },
});

const AboutUs = mongoose.model("AboutUs", aboutUsSchema);

module.exports = AboutUs;
