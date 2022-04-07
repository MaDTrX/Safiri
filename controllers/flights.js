const Trip = require('../models/trip.js')

var Amadeus = require('amadeus');
const fetch = require('node-fetch');
const trips = require('./trips.js');

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
        res.render('flights/shop', { response , id: req.params.id, notice: req.user.friends.length });
    }).catch(function (response) {
        res.send(response);
    });
}
function selectFlight (req, res) {
    console.log(req.params.id)
    //console.log(flight)
    Trip.findById(req.params.id, function (err, flights) {
        flights.flights.push(req.body)
        console.log(flights.flights)
    flights.save((err) => {
    res.redirect('/')
})
    })
}

 function basura(req, res) {
    //console.log(req.params.id)
   Flight.deleteOne({ _id: req.params.id })
    res.redirect('/flights')
}
