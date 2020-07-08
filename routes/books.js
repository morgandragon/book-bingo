const express = require('express');
const router = express.Router();
const common = require('./routescommon');

// bring in models
let Book = require('../models/book');
let User = require('../models/user');
let BingoSquare = require('../models/BingoSquare');
let BingoSquareUser = require('../models/BingoSquareUser');

// GET add book
router.get('/add', common.ensureAuthenticated, function(req, res) {
  BingoSquare.find({}, function(err, bingoSquares){
    if (err) {
      console.log(err);
    } else {
      res.render('add_book', {
        title:'Add Book',
        bingoSquares: bingoSquares
      });
    }
  });
});

// POST add book
router.post('/add', common.ensureAuthenticated, function(req, res) {
  req.checkBody('title', 'Title is required').notEmpty();
  req.checkBody('author', 'Author is required').notEmpty();

  // get errors
  let errors = req.validationErrors();

  if(errors) {
    res.render('add_book', {
      title: 'Add Book',
      errors:errors
    });
  } else {
    let book = new Book();
    book.title = req.body.title;
    book.user = req.user._id;
    book.author = req.body.author;
    book.bingoSquares = req.body.bingosquareselect;

    book.save(function(err) {
      if(err) {
        console.log(err);
        return;
      } else {
        req.flash('success', 'Book added');
        res.redirect('/');
      }
    });

    console.log(book.bingoSquares);
    book.bingoSquares.forEach(function(item, index) {
      let query = {bingosquare:item, user:book.user};
      BingoSquareUser.findOne(query, function(err, bingoSquareUser) {
        if (bingoSquareUser == null) {
          bingoSquareUser = new BingoSquareUser();
          bingoSquareUser.bingosquare = item;
          bingoSquareUser.user = book.user;
        }

        bingoSquareUser.potentialbooks.push(book._id);

        bingoSquareUser.save(function(err) {
          if (err) {
            console.log(err);
          }
        });

        console.log(bingoSquareUser);
      });
    });

  }
});

// GET list of books
router.get('/list', common.ensureAuthenticated, function(req, res) {
  let query = {user:req.user._id};
  Book.find(query, function(err, books) {
    if (err) {
      console.log(err);
    } else {
      res.render('booklist', {
        books:books
      });
    }
  });
});

// GET single book
router.get('/:id', common.ensureAuthenticated, function(req, res) {
  Book.findById(req.params.id, function(err, book) {
    User.findById(book.user, function(err, user) {
      if(err) {
        console.log(err);
      } else {
        BingoSquare.find({'_id': { $in: book.bingoSquares }}, function (err, bingoSquares) {
          res.render('book', {
            book:book,
            bingoSquares:bingoSquares,
          });
        });
      }
    });
  });
});

// GET edit form
router.get('/edit/:id', common.ensureAuthenticated, function(req, res) {
  Book.findById(req.params.id, function(err, book) {
    if (book.user != req.user._id) {
      req.flash('danger', 'Not Authorized');
      res.redirect('/');
    } else {
      BingoSquare.find({}, function(err, bingoSquares) {
        if(err) {
          console.log(err);
        } else {
          res.render('edit_book', {
            title: 'Edit Book',
            book:book,
            bingoSquares: bingoSquares
          });
        }
      });
    }
  });
});

// POST edit book
router.post('/edit/:id', common.ensureAuthenticated, function(req, res) {

  req.checkBody('title', 'Title is required').notEmpty();
  req.checkBody('author', 'Author is required').notEmpty();

  // get errors
  let errors = req.validationErrors();

  if(errors) {
    res.render('add_book', {
      title: 'Add Book',
      errors:errors
    });
  } else {
    let book = {};

    book.title = req.body.title;
    book.author = req.body.author;
    book.description = req.body.description;

    let query = {_id:req.params.id}

    Book.updateOne(query, book, function(err) {
      if(err) {
        console.log(err);
        return;
      } else {
        req.flash('success', 'Book Updated')
        res.redirect('/');
      }
    });
  }
});

// DELETE book
router.delete('/:id', common.ensureAuthenticated, function(req, res) {
  if (!req.user._id) {
    res.status(500).send();
  }

  let query = {_id:req.params.id};

  Book.findById(req.params.id, function(err, book) {
    if (book.user != req.user._id) {
      res.status(500).send();
    } else {
      Book.remove(query, function(err) {
        if(err) {
          console.log(err);
        }
        res.send('Success');
      });
    }
  });
});

// Access control
// function ensureAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next();
//   } else {
//     req.flash('danger', 'Please login');
//     res.redirect('/users/login');
//   }
// }

module.exports = router;
