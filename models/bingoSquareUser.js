let mongoose = require('mongoose');

// bingo square user schema
let bingoSquareUserSchema = mongoose.Schema( {
  bingoSquare:{
    type: String,
    required: true
  },
  user:{
    type: String,
    required: true
  },
  selectedBook:{
    type: String,
    required: true
  }
});

let BingoSquareUser = module.exports = mongoose.model('BingoSquareUser', bingoSquareUserSchema);
