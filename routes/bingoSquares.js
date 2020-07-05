const express = require('express');
const router = express.Router();

// GET BingoSquare
router.get('/:id', function(req, res) {
  res.render('bingosquare', {
  });
});

// router.get('/:id', ensureAuthenticated, function(req, res) {
//   Book.findById(req.params.id, function(err, book) {
//     User.findById(book.user, function(err, user) {
//       res.render('book', {
//         book:book,
//         username:user.username
//       });
//     });
//   });
// });

module.exports = router;
