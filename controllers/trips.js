const Trip = require('../models/trip.js')


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
function create (req, res) {

    const trip = new Trip(req.body)
    console.log(req.body)
    trip.save((err) => {
        if (err) return res.render('trips/new')
        res.redirect('trips')
    })
    
}

