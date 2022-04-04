var express = require('express');
var router = express.Router();
const isLoggedIn = require('../config/auth');
const tripsCtrl = require('../controllers/trips.js')


   
router.get('/',isLoggedIn, tripsCtrl.index)
router.get('/:id',isLoggedIn, tripsCtrl.show)
router.post('/new',isLoggedIn, tripsCtrl.create)
router.get('/:id/edit',isLoggedIn, tripsCtrl.edit)
router.put('/:id',isLoggedIn, tripsCtrl.update)
router.delete('/:id',isLoggedIn, tripsCtrl.delete)



module.exports = router;
