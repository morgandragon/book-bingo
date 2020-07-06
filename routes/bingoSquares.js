const express = require('express');
const router = express.Router();
const common = require('./routescommon');

let BingoSquare = require('../models/BingoSquare');
let BingoSquareUser = require('../models/BingoSquareUser');

// GET BingoSquare
router.get('/:id', common.ensureAuthenticated, function(req, res) {
  BingoSquare.findById(req.params.id, function(err, bingosquare) {
    let user = req.user;
    let query = {bingosquare:bingosquare._id, user:user._id};

    BingoSquareUser.findOne(query, function(err, bingoSquareUser) {
      if (bingoSquareUser == null) {
        let squareUser = new BingoSquareUser();
        squareUser.bingosquare = bingosquare._id;
        squareUser.user = user._id;

        squareUser.save(function(err) {
          console.log("saving new user bingo card");
          if (err) {
            console.log(err);
          }
        });

        bingoSquareUser = squareUser;
      }
      res.render('bingosquare', {
        bingosquare:bingosquare,
        bingosquareuser:bingoSquareUser
      });

    });
  });
});

module.exports = router;
