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

      console.log(bingoSquareUser.bingosquare);

      Book.find({bingoSquares:bingoSquareUser.bingosquare}, function (err, books) {

        // find a way to do this neater?
        let selectedTitle = '';
        for (i in books) {
          let book = books[i];
          if (book._id == bingoSquareUser.selectedbook) {
            console.log(book.title);
            selectedTitle = book.title;
            break;
          }
        }

        console.log("selected book: " + bingoSquareUser.selectedbook);
        res.render('bingosquare', {
          bingosquare: bingosquare,
          bingosquareuser: bingoSquareUser,
          books: books,
          selectedTitle: selectedTitle
        });
      });
    });
  });
});

// POST unselect book
router.post('/unselect/:bingosquareuserid', common.ensureAuthenticated, function(req, res) {
  BingoSquareUser.findById(req.params.bingosquareuserid, function (err, bingoSquareUser) {
    bingoSquareUser.selectedbook = undefined;

    console.log(bingoSquareUser);

    bingoSquareUser.save(function(err) {
      if(err) {
        console.log(err);
        return;
      } else {
        res.send('Success');
      }
    });
  });
});

// POST select book
router.post('/select/:bingosquareuserid', common.ensureAuthenticated, function(req, res) {
  BingoSquareUser.findById(req.params.bingosquareuserid, function (err, bingoSquareUser) {
    if(err) {
      console.log(err);
    } else {

      // ensure book isn't selected elsewhere
      let usedQuery = {user:req.user._id, selectedbook:req.body.bookid}
      BingoSquareUser.find(usedQuery, function(err, bingoSquareUsers) {
        if(bingoSquareUsers.length > 0) {
          req.flash('danger', 'Sorry, this book is selected for another bingo card.');
          res.redirect(req.get('referer'));
        } else {
          bingoSquareUser.selectedbook = req.body.bookid;

          console.log("bingo square user: " + bingoSquareUser)

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
