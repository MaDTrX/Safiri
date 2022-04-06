var express = require('express');
var router = express.Router();
const isLoggedIn = require('../config/auth');
const usersCtrl = require('../controllers/users.js')


   
router.get('/', usersCtrl.index)
router.post('/:id', usersCtrl.sendRequest)
router.post('/:id/friends', usersCtrl.acceptRequest)

module.exports = router;