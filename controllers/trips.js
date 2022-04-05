const Trip = require('../models/trip.js')
var Amadeus = require('amadeus');
const fetch = require('node-fetch');
const User = require('../models/user.js');

const amadeus = new Amadeus({
    clientId: process.env.AMADEUS_CLIENT_ID,
    clientSecret: process.env.AMADEUS_SECRET
});
 
const api_key = process.env.GOOGLE_API_KEY

module.exports = {
    index,
    new: newTrip,
    show,
    create,
    edit,
    delete: basura,
    update
   
}

function index(req, res) {
    if (req.user) {
Trip.find({user: req.user._id}, function (err, trips) {
        //console.log(trips)
        res.render('index', { trips})
    })
} else {
        res.render('index')
    }
}


function newTrip(req, res) {
    res.render('trips/new')
}

function show(req, res) {
    //console.log(req.params.id)
    Trip.findById(req.params.id, (err, trip) => {
       // console.log(trip)
        res.render('trips/show', { trip })
    })

}

async function create(req, res) {
    const origin = await amadeus.client.get('/v1/reference-data/locations', { subType: "CITY", keyword: req.body.origin })
    //console.log(origin.data[0].iataCode)
    const destination = await amadeus.client.get('/v1/reference-data/locations', { subType: "CITY", keyword: req.body.destination })
    //console.log(destination.data[0].iataCode)
    const placeSearch = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${req.body.destination}&inputtype=textquery&key=${api_key}`
    const placeId = await fetch (placeSearch)
    const response = await placeId.json()
    const place_Id = response.candidates[0].place_id
    const photoRefSearch = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_Id}&key=${api_key}`
    const photoRef = await fetch (photoRefSearch)
    const reference = await photoRef.json()
    const photo_reference = reference.result.photos[0].photo_reference
    const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photo_reference}&key=${api_key}`
    const urlfetch = await fetch (photoUrl)
    const url = urlfetch.url
    const trip = {
        origin: req.body.origin,
        originIATA: origin.data[0].iataCode,
        destination: req.body.destination,
        destinationIATA: destination.data[0].iataCode,
        depart: req.body.depart,
        return: req.body.return,
        tripPhoto: url,
        user: req.user._id
    }
    //console.log(trip)
    Trip.create(trip, (err, trip) => {
        //console.log("hi",trip)
        if (err) return res.redirect('/')
        trip.save()
        res.render('trips/new', { trip })
    })

}

async function basura(req, res) {
    //console.log(req.params.id)
    await Trip.deleteOne({ _id: req.params.id })
    res.redirect('/')
}
function edit(req, res) {
    //console.log(req.params.id)
    Trip.findById({_id: req.params.id}, (err, trip) => {
       // console.log(trip)
    res.render('trips/edit', {trip})
})
}

function update (req, res) {
//console.log(req.body)
Trip.findOneAndUpdate({_id: req.params.id}, 
    {
        origin: req.body.origin,
        destination: req.body.destination,
        depart: req.body.depart,
        return: req.body.return
    }, (err) => {
        res.redirect('/')
    })

}

