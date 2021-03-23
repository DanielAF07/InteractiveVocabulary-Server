const mongoose = require('mongoose')

const WordSchema = mongoose.Schema({
  word: {
    type: String,
    required: true,
    trim: true
  },
  imgPath: {
    type: String,
    required: true
  },
  grade: {
    type: Number,
    required: true
  },
  creado: {
    type: Date,
    default: Date.now(),
    immutable: true
  }
})

module.exports = mongoose.model('Word', WordSchema)