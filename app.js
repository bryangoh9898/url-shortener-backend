var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var urlRouter = require('./routes/url');

var app = express();

const url = 'mongodb://localhost:27017/shortener';

//Connect to MongoDB
// var url = 'mongodb+srv://urlShortener:LyoadohdO3fLQlth@cluster0.ladrmvu.mongodb.net/?retryWrites=true&w=majority'
const connect = mongoose.connect(url,   {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


connect.then((db) => {
  console.log("Connected correctly to database: ");
}, (err) => { console.log(err); });


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//Using Several Middlewares
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/url', urlRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
