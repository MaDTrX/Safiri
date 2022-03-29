var express = require('express');
var router = express.Router();
const passport = require('passport');
const isLoggedIn = require('../config/auth');
var Amadeus = require('amadeus');
const tripsCtrl = require('../controllers/trips.js')

var amadeus = new Amadeus({
  clientId: process.env.AMADEUS_CLIENT_ID,
  clientSecret: process.env.AMADEUS_SECRET
});

router.get('/', tripsCtrl.index)


router.get(`/flight-search`, isLoggedIn,  (req, res) => {
  const originCode = req.query.originCode;
  const destinationCode = req.query.destinationCode;
  const dateOfDeparture = req.query.dateOfDeparture
  const dateOfReturn = req.query.dateOfReturn
  const numberOfPeople = req.query.adults
  // Find the cheapest flights
  amadeus.shopping.flightOffersSearch.get({
      originLocationCode: originCode,
      destinationLocationCode: destinationCode,
      departureDate: dateOfDeparture,
      returnDate: dateOfReturn,
      adults: numberOfPeople,
      max: '7'
  }).then(function (response) {
      res.render('flights', {response});
  }).catch(function (response) {
      res.send(response);
  });
  });


// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  'google',
  {
    scope: ['profile', 'email'],
    // Optionally force pick account every time
    // prompt: "select_account"
  }
));
// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/',
    failureRedirect : '/'
  }
));
// OAuth logout route
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

module.exports = router;

  // router.get(`/api/hotels`, (req, res) => {
  //   const cityCode = req.query.originCode;
  //    amadeus.shopping.hotelOffers.get({
  //     cityCode: "MAD"
    
  // }).then(function (response) {
  //   res.send(response);
  // }).catch(function (response) {
  //   res.send(response);
  // })
  // });