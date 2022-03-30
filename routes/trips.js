var express = require('express');
var router = express.Router();
const isLoggedIn = require('../config/auth');
const tripsCtrl = require('../controllers/trips.js')


   
router.get('/',isLoggedIn, tripsCtrl.new)
router.get('/new',isLoggedIn, tripsCtrl.new)
router.get('/:id',isLoggedIn, tripsCtrl.show)
router.post('/',isLoggedIn, tripsCtrl.create)


module.exports = router;
