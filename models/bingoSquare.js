let mongoose = require('mongoose');

// bingo square schema
let bingoSquareSchema = mongoose.Schema( {
  name:{
    type: String,
    required: true
  },
  description:{
    type: String,
    required: false
  },
  hardmode: {
    type: String,
    required: false
  },
  card: {
    type: String,
    required: true
  }
});

let BingoSquare = module.exports = mongoose.model('BingoSquare', bingoSquareSchema);
