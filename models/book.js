let mongoose = require('mongoose');

// book schema
let bookSchema = mongoose.Schema( {
  title:{
    type: String,
    required: true
  },
  author:{
    type: String,
    required: true
  },
  user:{
    type: String,
    required: true
  },
  bingoSquares:{
    type: [String],
    required: false
  }
});

let Book = module.exports = mongoose.model('Book', bookSchema);
