
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
        
        res.render('friends/search', {users, warn: "Add Friends!"})
    })
} else {
        res.render('index')
    }
}
function request (req, res) {
    User.findById(req.params.id, (err, user) => {
        console.log("test id REQUEST", user.requests)
        // console.log("test2", req.params.id)
        for(let i = 0; i < user.requests.length; i++) {
        if (user.requests[i] === req.user._id) {
            res.render('friends/search', {Warn: "Send Request already sent!!"})
        }
    }
        user.requests.push(req.user._id)
        user.save()
        console.log("austin test", user.requests)
        res.redirect('/')
    
    })
}
