var Weather = require('../module/Weather.js');

class WeatherCtrl {
	static getAll (req, res) {
		var db = req.app.get('db');
		Weather.getAll(db)
		.then(data => {
			res.json(data);
		})
	}
	static getOne (req, res) {
		var db = req.app.get('db');
		var name = req.params.city;
		Weather.getOne(db, name)
		.then(data => {
			res.json(data);
		})
	}
}

module.exports = WeatherCtrl;