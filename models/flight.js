const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
    },
    adults: {
        type: Number
    },
},
{
        timestamps: true
})

module.exports = mongoose.model('Flight', flightSchema);