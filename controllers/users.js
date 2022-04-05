
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
        console.log("test id", req.user._id)
        // console.log("test2", req.params.id)
        user.requests.push(req.user)
        console.log("austin test", user.name)
        res.redirect('/')
    })
}
