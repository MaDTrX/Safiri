const Trip = require('../models/trip.js')
const Flight = require('../models/flight.js')
var Amadeus = require('amadeus');
const fetch = require('node-fetch')

var amadeus = new Amadeus({
    clientId: process.env.AMADEUS_CLIENT_ID,
    clientSecret: process.env.AMADEUS_SECRET
});

module.exports = {
    search, 
    selectFlight, 
    delete: basura
}

function search (req, res) {
    let dt = new Date(req.query.dateOfDeparture)
    let rt = new Date(req.query.dateOfReturn)

    let departDate = `${dt.getFullYear()}-${(dt.getMonth() + 1).toString().padStart(2, '0')}-${dt.getDate().toString().padStart(2, '0')}`
    let returnDate = `${rt.getFullYear()}-${(rt.getMonth() + 1).toString().padStart(2, '0')}-${rt.getDate().toString().padStart(2, '0')}`

    amadeus.shopping.flightOffersSearch.get({
        originLocationCode: req.query.originIATA,
        destinationLocationCode: req.query.destinationIATA,
        departureDate: departDate,
        returnDate: returnDate,
        adults: req.query.adults,
        travelClass: req.query.class,
        currencyCode: req.query.currency,
        maxPrice: req.query.maxPrice,
        max: '7'
    }).then(function (response) {
        res.render('flights/shop', { response });
    }).catch(function (response) {
        res.send(response);
    });
}
function selectFlight (req, res) {
    Flight.find({}, function (err, flights) {
  const flight = new Flight(req.body)
  flight.save((err) => {
    res.render('flights', { flights })
})
    })
}

 function basura(req, res) {
    //console.log(req.params.id)
   Flight.deleteOne({ _id: req.params.id })
    res.redirect('/flights')
}
