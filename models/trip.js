const mongoose = require('mongoose')
const Schema = mongoose.Schema


const hotelSchema = new Schema({
    from: {
        type: Array,
        required: true
    },
    to: {
        type: Array,
        required: false
    },
    depart: {
        type: Array,
        required: true
    },
    arrival: {
        type: Array,
        required: true
    }, 
    price: {
        type:String
    }
},
    {
        timestamps: true

    })
const flightSchema = new Schema({
    from: {
        type: Array,
        required: true
    },
    to: {
        type: Array,
        required: false
    },
    depart: {
        type: Array,
        required: true
    },
    arrival: {
        type: Array,
        required: true
    }, 
    price: {
        type:String
    }
},
    {
        timestamps: true

    })
const tripSchema = new Schema({
    origin: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: false
    },
    depart: Date,
    return: Date, 

    flights: [flightSchema], 
    hotels: [hotelSchema], 
    // tours: [tourSchema], 
    total: {
        type:String
    }
},
    {
        timestamps: true

    })

module.exports = mongoose.model('TripCollection', tripSchema)
