var express = require('express');
var router = express.Router();
const isLoggedIn = require('../config/auth');
const usersCtrl = require('../controllers/users.js')


   
router.get('/',isLoggedIn, usersCtrl.index)
router.get('/:id',isLoggedIn, usersCtrl.request)

module.exports = router;