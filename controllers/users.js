var Amadeus = require('amadeus');
const fetch = require('node-fetch');
const User = require('../models/user.js');

module.exports = {
    index,
    sendRequest,
    acceptRequest,
    denyRequest,
}

function index(req, res) {
        User.find({}, function (err, users) {
            let noNewFriends = []
            for (let i = 0; i < users.length; i++) {
                if (req.user.friends.length === 0) {
                    noNewFriends.push(users[i])
                } else {
                    for (let j = 0; j < req.user.friends.length; j++) {
                        if (users[i].googleId === req.user.friends[j].googleId) {
                            noNewFriends.push({ _id: users[i]._id, name: users[i].name, avatar: users[i].avatar })
                        }
                    }
                }
            }
            //console.log(noNewFriends)
            let userDisplay = noNewFriends.filter(user => user.googleId !== req.user.googleId)
            res.render('friends/search', { userDisplay, notice: req.user.requests.length, requests: req.user.requests, friends: req.user })
        })
}
function sendRequest(req, res) {
    User.findById(req.params.id, (err, user) => {
        if (user.requests.includes(req.user._id)) {
            res.send({ Alert: "Friend request already Sent!" })
        } else {
            user.requests.push({ _id: req.user._id, name: req.user.name, avatar: req.user.avatar })
            user.save()
            res.redirect('/')
        }

    })
}
function acceptRequest(req, res) {
    User.findById(req.params.id, (err, requestor) => {
        requestor.friends.push({ _id: requestor._id, goog: requestor.googleId, name: req.user.name, avatar: req.user.avatar })
        let friend = req.user.friends.push({ _id: req.user._id, goog: req.user.googleId, name: requestor.name, avatar: requestor.avatar })
        let requestIdx = req.user.requests.indexOf(req.params.id)
        let accept = req.user.requests.splice(requestIdx, 1)
        req.user.save()
        requestor.save()
        res.redirect('/')
    })
}

function denyRequest(req, res) {
    User.findById(req.params.id, (err, requestor) => {
        let requestIdx = req.user.requests.indexOf(req.params.id)
        let deny = req.user.requests.splice(requestIdx, 1)
        req.user.save()
        requestor.save()
        res.redirect('/')
    })
}
