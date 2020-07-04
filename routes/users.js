const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// bring in models
let User = require('../models/user')

// GET registration form
router.get('/register', function(res, res) {
  res.render('register');
});

// POST register user
router.post('/register', function(req, res) {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const passwordconfirm = req.body.passwordconfirm;

  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('passwordconfirm', 'Passwords do not match').equals(req.body.password);

  let errors = req.validationErrors();

  if(errors)  {
    res.render('register', {
      errors:errors
    });
  } else {
    let newUser = new User({
      username:username,
      email:email,
      password:password
    });

    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(newUser.password, salt, function(error, hash) {
        if(err) {
          console.log(err);
        }
        newUser.password = hash;
        newUser.save(function(err) {
          if(err) {
            console.log(err);
          } else {
            req.flash('success', 'You are now registered and can log in');
            res.redirect('/users/login')
          }
        })
      });
    });
  }
});

// GET log in page
router.get('/login', function(req, res) {
  res.render('login');
});

// POST log in
router.post('/login', function(req, res, next) {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

// GET log out
router.get('/logout', function(req, res) {
  req.logout();
  req.flash('success', 'You are logged out');
  res.redirect('/users/login');
})

module.exports = router;
