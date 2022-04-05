var express = require('express');
var router = express.Router();
const isLoggedIn = require('../config/auth');
const usersCtrl = require('../controllers/users.js')


   
router.get('/',isLoggedIn, usersCtrl.index)
router.post('/:id',isLoggedIn, usersCtrl.sendRequest)
router.post('/:id/friends',isLoggedIn, usersCtrl.respondToRequest)

module.exports = router;