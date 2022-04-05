
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
        if (user.requests.length === 0) {
        console.log("test id REQUEST", user.requests)
        // console.log("test2", req.params.id)
        user.requests.push(req.user._id)
        user.save()
        console.log("austin test", user.requests)
        res.redirect('/')
        } else {
           if (user.requests.includes(id => id === req.user._id))
                    res.send({hi:"hey"})

            }
            
        }
    })
}
