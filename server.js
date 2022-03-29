var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session')
const passport = require('passport')
const parser = require('body-parser')
const methodOverride = require('method-override');


require('dotenv').config()
require('./config/database.js')
require('./config/passport.js');


var indexRouter = require('./routes/index.js');
var tripsRouter = require('./routes/trips.js');
// var flightsRouter = require('./routes/flights.js');
 //var hotelsRouter = require('./routes/hotels.js');
// var calendarRouter = require('./routes/calendar.js');
// var toursRouter = require('./routes/tours.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(parser.json())


// new code below
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));


app.use(passport.initialize())
app.use(passport.session())

app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});


app.use('/', indexRouter);
app.use('/trips', tripsRouter);
//app.use('/', hotelsRouter)
// app.use('/flights', flightsRouter);
// app.use('/hotels', hotelsRouter);
// app.use('/calendar', calendarRouter);
// app.use('/tours', toursRouter);

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
