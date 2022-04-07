var Amadeus = require('amadeus');
const fetch = require('node-fetch');
const User = require('../models/user.js');

module.exports = {
    index,
    sendRequest,
    acceptRequest,
    denyRequest,
}

// for (var i = 0, len = req.user.friends.length; i < len; i++) { 
//     for (var j = 0, len2 = users.length; j < len2; j++) { 
//         if (req.user.friends[i].name === users[j].name) {
//             users.splice(j, 1);
//             len2=users.length;
//         }
//     }
// }
function index(req, res) {
    User.find({}, function (err, users) {
        if (req.user.friends.length === 0) {
            let userDisplay = users.filter(user => user.googleId !== req.user.googleId)
            res.render('friends/search', { userDisplay, notice: req.user.requests.length, requests: req.user.requests, friends: req.user.friends })

        } else {
            let userDisplay = users.filter(user => user.googleId !== req.user.googleId)
            let friends = req.user.friends
            for (var i = 0, len = friends.length; i < len; i++) {
                for (var j = 0, len2 = userDisplay.length; j < len2; j++) {
                    if (friends[i].googleId === userDisplay[j].googleId) {
                        userDisplay.splice(j, 1);
                        len2 = userDisplay.length;
                    }
                }
            }
            res.render('friends/search', { userDisplay, notice: req.user.requests.length, requests: req.user.requests, friends: req.user.friends })
        }
    })
}
function sendRequest(req, res) {
    User.findById(req.params.id, (err, user) => {
        if (user.requests.some(request => request.googleId === req.user.googleId)) {
            res.send({ Alert: "Friend request already Sent!" })

        } else {
            user.requests.push({ _id: req.user._id, googleId: req.user.googleId, name: req.user.name, avatar: req.user.avatar })
            user.save()
            res.redirect('/')
        }

    })
}
function acceptRequest(req, res) {
    User.findById(req.params.id, (err, requestor) => {
        requestor.friends.push({ _id: req.user._id, googleId: req.user.googleId, name: req.user.name, avatar: req.user.avatar })
        let friend = req.user.friends.push({ _id: requestor._id, googleId: requestor.googleId, name: requestor.name, avatar: requestor.avatar })
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
