const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  path: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Path',
    required: true
  },
  order: {
    type: Number,
    default: 0
  },
  vocabulary: [{
    word: String,
    translation: String,
    example: String
  }],
  phrases: [{
    phrase: String,
    translation: String,
    context: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Lesson', lessonSchema);
