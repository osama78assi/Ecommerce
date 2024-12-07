const mongoose = require("mongoose");

const sliderSchema = new mongoose.Schema({
  title: [
    {
      language: { type: String },
      text: { type: String },
    },
  ],
  description: [
    {
      language: { type: String },
      text: { type: String },
    },
  ],
  img: {
    type: String,
    required: true,
  },
});

const Slider = mongoose.model("Slider", sliderSchema);

module.exports = Slider;
