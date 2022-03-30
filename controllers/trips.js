const Trip = require('../models/trip.js')
var Amadeus = require('amadeus');
const fetch = require('node-fetch')

var amadeus = new Amadeus({
  clientId: process.env.AMADEUS_CLIENT_ID,
  clientSecret: process.env.AMADEUS_SECRET
});

module.exports = {
    index,
    new: newTrip,
    show,
    create, 
    //search
}

function index(req, res) {
    Trip.find({}, function(err, trips) {
        //console.log(trips)
        res.render('index', { trips })
    })
}


function newTrip  (req, res) {

    res.render('trips/new')
}

function show (req, res) {
    Trip.findById(req.params.id, (err, trips) => {
        res.render('trips/show', {trips})
    })

}

 async function create (req, res) {
     const origin =  await amadeus.client.get('/v1/reference-data/locations', {subType: "CITY", keyword: req.body.origin } )
    console.log(origin.data[0].iataCode)
    const destination =  await amadeus.client.get('/v1/reference-data/locations', {subType: "CITY", keyword: req.body.destination } )
     console.log(destination.data[0].iataCode)
   const trip = {
       origin: req.body.origin,
       originIATA: origin.data[0].iataCode,
       destination :req.body.destination,
       destinationIATA:destination.data[0].iataCode,
       depart:req.body.depart,
       return:req.body.return
   }
   console.log(trip)
   Trip.create(trip, (err, trip) => {
       //console.log("hi",trip)
       if (err) return res.redirect('/')
       trip.save()
       res.render('trips/new', { trip })
    })
    
}

// const newTrip = req.body
// const trip = new Trip(req.body)
//console.log(newTrip)
