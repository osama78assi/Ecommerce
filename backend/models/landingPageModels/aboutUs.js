const mongoose = require('mongoose');

const aboutUsSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
});

const AboutUs = mongoose.model('AboutUs', aboutUsSchema);

module.exports = AboutUs;