const express = require('express');
const router = express.Router();
const common = require('./routescommon');

let BingoSquare = require('../models/BingoSquare');
let BingoSquareUser = require('../models/BingoSquareUser');
let Book = require('../models/book');

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

      console.log(bingoSquareUser.bingoSquare);
      Book.find({bingoSquare:bingoSquareUser.bingoSquare}, function (err, books) {
        console.log("books! " + books);
        res.render('bingosquare', {
          bingosquare:bingosquare,
          bingosquareuser:bingoSquareUser,
          books: books
        });
      });
    });
  });
});

// POST select book
// needs to become a post
router.get('/select/:bingosquareuserid/:bookid', common.ensureAuthenticated, function(req, res) {
  BingoSquareUser.findById(req.params.bingosquareuserid, function (err, bingoSquareUser) {
    if(err) {
      console.log(err);
    } else {

      // ensure book isn't selected elsewhere
      let usedQuery = {user:req.user._id, selectedbook:req.params.bookid}
      BingoSquareUser.find(usedQuery, function(err, bingoSquareUsers) {
        if(bingoSquareUsers.length > 0) {
          req.flash('danger', 'Sorry, this book is selected for another bingo card.');
          res.redirect(req.get('referer'));
        } else {
          bingoSquareUser.selectedbook = req.params.bookid;

          let query = {_id:bingoSquareUser._id}

          BingoSquareUser.updateOne(query, bingoSquareUser, function(err) {
            if(err) {
              console.log(err);
              return;
            } else {
              req.flash('success', 'Book Selected')
              res.redirect(req.get('referer'));
            }
          });
        }
      });
    }
  });
});


module.exports = router;
