var express = require('express');
var router = express.Router();
var WeatherCtrl = require('../controllers/WeatherCtrl.js');

router.get('/city/all', WeatherCtrl.getAll)
router.get('/city/:city', WeatherCtrl.getOne)

module.exports = router;