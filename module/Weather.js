var request = require('request');

class Weather {
	static getAll (db) {
		return db.collection('weather').find().toArray()
	}
	static getOne (db, name) {
		return db.collection('weather').find(
			{name: name}
			).toArray()
	}
	static updateOne (db, city, update) {
		db.collection('weather').update(
			{name: city},
			{$set: {
				temp: update.main.temp - 273.15, 
				condition: update.weather[0].main,
				des: update.weather[0].description,
				max_temp: (update.main.temp_max - 273.15),
				min_temp: (update.main.temp_min - 273.15),
				last_update: new Date(Date.now())
			}}
		)
	}
	static updateAll (db) {
		setInterval(() => {
			this.getAll(db)
			.then(all => {
				for (var i = 0; i < all.length; i++) {
					var city = all[i].name;
					var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2cb0c6200e88624523b6cd04ed5a7e2f`;
					request(url, (error, response, body) => {
						var update = JSON.parse(body);
						var name = update.name;
						// console.log(name);
						this.updateOne(db, name, update)
					});
				}
			})
			console.log('last update: '+ new Date(Date.now()));
			console.log('~ ~ ~ ~ ~ ~ ~ ~ ~')
		}, 3000);
	}
}

module.exports = Weather;