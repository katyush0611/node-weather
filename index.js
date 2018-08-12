var express = require('express');
var bodyParser = require('body-parser');
// var parse = require('json-par')
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var weatherRouter = require('./routes/weatherRouter.js');
// var http = require('http');
// var Currency = require('./modules/Currency.js');
// var currencyRouter = require('./routes/currencyRouter.js');
var Weather = require('./module/Weather.js');
var connection = MongoClient.connect(
	'mongodb://localhost:27017',
	{ usernameUrlParser: true })
var db;

var app = express();
app.use(weatherRouter);

connection.then(connection => {
	db = connection.db('weather');
	app.set('db', db);	
	Weather.updateAll(db);	
	app.listen('3000', () => {
		console.log('ok');
	})

}).catch(err => console.log(err))
