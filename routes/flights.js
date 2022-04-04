const express = require('express')
const router = express.Router()
const isLoggedIn = require('../config/auth')
const Amadeus = require('amadeus')
const flightsCtrl = require('../controllers/flights.js')

const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_CLIENT_ID,
  clientSecret: process.env.AMADEUS_SECRET
})


router.get(`/:id/flight-search`,isLoggedIn.apply, flightsCtrl.search)
router.post('/:id/new',isLoggedIn, flightsCtrl.selectFlight)
router.delete('/:id',isLoggedIn, flightsCtrl.delete)

module.exports = router