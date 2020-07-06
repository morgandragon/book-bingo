let mongoose = require('mongoose');

// bingo square user schema
let bingoSquareUserSchema = mongoose.Schema( {
  bingosquare:{
    type: String,
    required: true
  },
  user:{
    type: String,
    required: true
  },
  selectedbook:{
    type: String,
    required: false
  },
  potentialbooks: {
    type: [String],
    required: false
  }
});

let BingoSquareUser = module.exports = mongoose.model('BingoSquareUser', bingoSquareUserSchema);
