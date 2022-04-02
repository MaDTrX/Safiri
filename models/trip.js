const mongoose = require('mongoose')
const Schema = mongoose.Schema


const flightSchema = new Schema({
    price: {
        type: String,
    },
    from: {
        type: Array,
    },
    to: {
        type: Array,
        
    },
    depart: {
        type: Array,
         
    },
    arrival: {
        type: Array,
        
    }, 
  
},
{
        timestamps: true
})


const tripSchema = new Schema({
    origin: {
        type: String,
        required: true
    },
    originIATA: {
        type:String,
        required: true
    },
    destinationIATA: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    depart: {
        type: Date,
        required: true
    },
    return: {
        type: Date,
        required: true
    }, 

    flights: [flightSchema], 
   
    total: {
        type:String,
        required: false
    }
},
    {
        timestamps: true

    })

module.exports = mongoose.model('Trips', tripSchema)

        // const hotelSchema = new Schema({
        //     from: {
        //         type: Array,
        //         required: true
        //     },
        //     to: {
        //         type: Array,
        //         required: false
        //     },
        //     depart: {
        //         type: Array,
        //         required: true
        //     },
        //     arrival: {
        //         type: Array,
        //         required: true
        //     }, 
        //     price: {
        //         type:String
        //     }
        // },
        //     {
        //         timestamps: true
        
        //     })