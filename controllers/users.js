
var Amadeus = require('amadeus');
const fetch = require('node-fetch');
const User = require('../models/user.js');

module.exports = {
    index,
    request,
}

function index(req, res) {
    if (req.user) {
User.find({}, function (err, users) {
        res.render('friends/search', {users, notice:req.user.requests.length})
    })
} else {
        res.render('index')
    }
}
function request (req, res) {
    User.findById(req.params.id, (err, user) => {
        if (user.requests.includes(req.user._id)){
            console.log('hi')
            res.send({Alert:"Friend request already Sent!"})   
        } else {
        user.requests.push(req.user._id)
        user.save()
        res.redirect('/')
        }
            
        })
    
}
