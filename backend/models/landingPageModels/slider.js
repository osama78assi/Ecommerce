const mongoose = require('mongoose');

const sliderSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true, // Ensures no duplicate IDs
  },
  desc: [{
    language: { type: String, required: true },
    text: { type: String, required: true },
  }],
  img: {
    type: String,
    required: false,
  },
});

const Slider = mongoose.model('Slider', sliderSchema);

module.exports = Slider;