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

  Book.find({}, function(err, books) {
    if(err) {
      console.log(err);
    } else {
      res.render('index', {
        title:'Welcome',
        books: books
      });
    }
  });
});

// route files
let books = require('./routes/books');
let users = require('./routes/users');
app.use('/books', books);
app.use('/users', users);

// start server
app.listen(3000, function() {
  console.log('server started on port 3000');
});
