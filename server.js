const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const session = require('express-session')
const passport = require('passport')
const parser = require('body-parser')
const methodOverride = require('method-override')


require('dotenv').config()
require('./config/database.js')
require('./config/passport.js')


const indexRouter = require('./routes/index.js')
const tripsRouter = require('./routes/trips.js')
const flightsRouter = require('./routes/flights.js')
 //const hotelsRouter = require('./routes/hotels.js')
// const calendarRouter = require('./routes/calendar.js')
// const toursRouter = require('./routes/tours.js')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(parser.json())


// new code below
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}))


app.use(passport.initialize())
app.use(passport.session())

app.use(function (req, res, next) {
  res.locals.user = req.user
  next()
})


app.use('/', indexRouter)
app.use('/trips', tripsRouter)
app.use('/flights', flightsRouter)
// app.use('/hotels', hotelsRouter)
// app.use('/calendar', calendarRouter)
// app.use('/tours', toursRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
});

module.exports = app;
