var express = require('express');
var router = express.Router();
const isLoggedIn = require('../config/auth');
const tripsCtrl = require('../controllers/trips.js')


   
router.get('/', tripsCtrl.index)
//router.get('/:id', tripsCtrl.show)
router.post('/new', tripsCtrl.create)
router.get('/:id/edit', tripsCtrl.edit)
router.put('/:id/', tripsCtrl.update)
router.delete('/:id', tripsCtrl.delete)



module.exports = router;
