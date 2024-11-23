const mongoose = require('mongoose');

const visionSchema = new mongoose.Schema({
  title: [{
    language: { type: String, required: true },
    text: { type: String, required: true },
  }],
  description: [{
    language: { type: String, required: true },
    text: { type: String, required: true },
  }],
  image: {
    type: String,
    required: false,
  },
});

const Vision = mongoose.model('Vision', visionSchema);

module.exports = Vision;