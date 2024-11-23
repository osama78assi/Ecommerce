const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  title: [{
    language: { type: String, required: true },
    text: { type: String, required: true },
  }],
  description: [{
    language: { type: String, required: true },
    text: { type: String, required: true },
  }],
});

const Goal = mongoose.model('Goal', goalSchema);

module.exports = Goal;