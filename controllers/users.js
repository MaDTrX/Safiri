
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
        
        res.render('friends/search', {users})
    })
} else {
        res.render('index')
    }
}
function request (req, res) {
    User.findById(req.params.id, (err, user) => {
        console.log("test1", req.user)
        console.log("test2", req.params.id)
        user.requests.push(req.user)
        console.log("test3", user.requests)
        res.redirect('/')
    })
}
