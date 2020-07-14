const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const config = require('./config/database');

mongoose.connect(config.database);
mongoose.set('debug', true)
let db = mongoose.connection;

// check connection
db.once('open', function() {
  console.log('Connected to MongoDB');
});

// check for db errors
db.on('error', function(err) {
  console.log(err);
});

// init app
const app = express();

// bring in models
let Book = require('./models/book')
let BingoSquare = require('./models/BingoSquare')
let BingoSquareUser = require('./models/BingoSquareUser')

// load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Body Parser middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// Express Validator Middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// set Public folder
app.use(express.static(path.join(__dirname, 'public')));

// Express Session middleware
app.use(session({
  secret: 'Bob Meister Schnitzel Finker West',
  resave: true,
  saveUninitialized: true,
}));

// Express Messages middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// passport config
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

app.get('*', function(req, res, next) {
  res.locals.user = req.user || null;
  next();
})


// GET home
app.get('/', function(req, res) {

  BingoSquare.find({}, function(err, bingoSquares) {
    if(err) {
      console.log(err);
    } else {
      if(req.isAuthenticated()) {
        let user = req.user;

        BingoSquareUser.find({user:user._id}, function(err, bingoSquareUsers) {

          if (err) {
            console.log(err)
          } else {
            let bingoSquareData = [];
            for (i in bingoSquares) {
              let bingoSquare = bingoSquares[i];
              let userBingoSquare = bingoSquareUsers.filter(bingoSquareUser => bingoSquareUser.bingosquare == bingoSquare._id);
              if (userBingoSquare[0] != undefined && userBingoSquare[0].selectedbook != undefined) {
                console.log("there is a selected book");
                bingoSquareData.push({"bingoSquare": bingoSquare, "selectedBook": true})
              } else {
                bingoSquareData.push({"bingoSquare": bingoSquare, "selectedBook": false})
              }
              // TODO if there is selected book, add that to the bingo square data
              // otherwise add the plain bungo square with false selected book
              // possibly create new pug file for this
              // figure out how to separate out duplicate pug code
            }

            res.render('bingocard', {
              title:'Welcome ' + user.username,
              bingoSquareData: bingoSquareData,
            });
            return;
          }

        });
      } else {
        res.render('index', {
          title:'Welcome Guest',
          bingoSquares: bingoSquares,
          bingoSquareUsers: []
        });
      }
    }
  });
});

// route files
let books = require('./routes/books');
let users = require('./routes/users');
let bingosquares = require('./routes/bingosquares');
app.use('/books', books);
app.use('/users', users);
app.use('/bingosquares', bingosquares);

// start server
app.listen(3000, function() {
  console.log('server started on port 3000');
});
