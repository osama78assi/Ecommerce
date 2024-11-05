const mongoose = require('mongoose');

const visionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
});

const Vision = mongoose.model('Vision', visionSchema);

module.exports = Vision;