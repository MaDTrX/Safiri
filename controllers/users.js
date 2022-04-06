
var Amadeus = require('amadeus');
const fetch = require('node-fetch');
const User = require('../models/user.js');

module.exports = {
    index,
    sendRequest,
    respondToRequest,
}

function index(req, res) {
    if (req.user) {
User.find({}, function (err, users) {
    let userDisplay = users.filter(user => user.name != req.user.name)
   
        res.render('friends/search', {userDisplay, notice:req.user.requests.length, requests: req.user.requests, friends:req.user.friends})
    })
} else {
        res.render('index')
    }
}
function sendRequest (req, res) {
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
function respondToRequest (req, res) {
    User.findById(req.params.id, (err, requestor) => {
        console.log('req', requestor)
        console.log('user ', req.user)
    requestor.friends.push(req.user)
    let friends = req.user.friends.push(requestor)
    let requestIdx = req.user.requests.indexOf(req.params.id)
    let accept = req.user.requests.splice(requestIdx, 1)
    req.user.save()
    requestor.save()    
    res.redirect('/friends/search')
})
}
