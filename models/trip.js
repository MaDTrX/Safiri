const mongoose = require('mongoose')
const Schema = mongoose.Schema


const tripSchema = new Schema({
    duration: {
        type: Number,
        required: true
    },
    airline: {
        type: String,
        required: false
    }
},
    {
        timestamps: true

    })

module.exports = mongoose.model('TripCollection', tripSchema)
