const express 		= require('express');
const router 		= express.Router();
const dotenv 		= require('dotenv').config()
const bcrypt 		= require('bcryptjs');
const superagent 	= require('superagent')
const Experience 	= require('../models/experience.js');
const User 			= require('../models/user.js');
const Restaurant 	= require('../models/restaurant.js')


// GET Request for restaurants based on searchTerm keyword
router.get('/', (req, res, next) => {
		console.log(process.env.apiKey);
		const apiKey = process.env.apiKey
		superagent
			//get request which has the user's searchTerm concatenated into the string 
			.get(`https://developers.zomato.com/api/v2.1/search?q=${req.query.searchTerm}`)
			.set('user-key', apiKey)
			.then((data) => {
				let actualData = JSON.parse(data.text)
				// console.log('<---Restaurant--->');
				// console.log(actualData.restaurants[0].restaurant.name); // this prints the name of 1 restaurant..
				const parsedData = actualData.restaurants.map( (element, i) => {
					return {
						name: element.restaurant.name,
						cuisine: element.restaurant.cuisines,
						url: element.restaurant.url,
						address: element.restaurant.location.address,
						zipCode: element.restaurant.location.zipcode,
						cityId: element.restaurant.location.city_id
					}
				})
				res.json({
					status: 200,
					data: parsedData
				})
			})
}) 


// API CALL TO GET USER LOCATION BY CITY ID
router.get('/city', (req, res, next) => {
		console.log(process.env.apiKey);
		const apiKey = process.env.apiKey
		superagent
			//get request which has the user's searchTerm concatenated into the string 
			.get(`https://developers.zomato.com/api/v2.1/locations?query=${req.query.searchTerm}&count=100`)
			.set('user-key', apiKey)
			.then((data) => {
				let actualData = JSON.parse(data.text)
				// console.log('<---Restaurant--->');
				console.log(actualData); // this prints the name of city information..
				const parsedData = actualData.location_suggestions.map((city, i) => {
					return {
						city: city.title,
						city_id: city.city_id,
						cityEntityId: city.entity_id,
						lat: city.latitude,
						lon: city.longitude,
					}
				})
				res.json({
					status: 200,
					data: parsedData
				})
			})
}) 


module.exports = router;