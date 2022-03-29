var express = require('express');
var router = express.Router();
const tripsCtrl = require('../controllers/trips.js')


   
router.get('/new', tripsCtrl.new)
router.get('/:id', tripsCtrl.show)
router.post('/', tripsCtrl.create)


module.exports = router;
