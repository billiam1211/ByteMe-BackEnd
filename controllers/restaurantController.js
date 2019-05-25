const express 		= require('express');
const router 		= express.Router();
const dotenv 		= require('dotenv').config()
const bcrypt 		= require('bcryptjs');
const superagent 	= require('superagent')
const Experience 	= require('../models/experience.js');
const User 			= require('../models/user.js');
const Restaurant 	= require('../models/restaurant.js')
const apiKey = process.env.API_KEY

// Post Request for restaurants based on searchTerm keyword
router.post('/search', (req, res, next) => {
	console.log('Hit Restaurant Get Route');

	superagent
		//get request which has the user's searchTerm concatenated into the string 
		.get(`https://developers.zomato.com/api/v2.1/search?entity_id=292&entity_type=city&q=${req.body.query}`)
		.set('user-key', apiKey)
		.then((data) => {

			let actualData = JSON.parse(data.text)
			// console.log('<---Restaurant--->');
			console.log(actualData.restaurants); // this prints the name of 1 restaurant..
			
			const parsedData = actualData.restaurants.map( (element, i) => {
				return {
					restaurantId: element.restaurant.id,
					name: element.restaurant.name,
					cuisine: element.restaurant.cuisines,
					url: element.restaurant.url,
					address: element.restaurant.location.address,
					zipCode: element.restaurant.location.zipcode,
					cityId: element.restaurant.location.city_id
				}
			})

			console.log("data to send: ", parsedData)

			res.json({
				status: 200,
				data: parsedData
			})
		})
}) 



// Post Request for restaurants based on searchTerm keyword
router.post('/find', (req, res, next) => {
	console.log('Hit Single Restaurant Find Get Route');

	superagent
		//get request which has the user's searchTerm concatenated into the string 
		.get(`https://developers.zomato.com/api/v2.1/restaurant?res_id=${req.body.query}`)
		.set('user-key', apiKey)
		.then((data) => {

			let actualData = JSON.parse(data.text)
			// console.log('<---Restaurant--->');
			console.log(actualData.restaurants); // this prints the name of 1 restaurant..
			
			const parsedData = actualData.restaurants.map( (element, i) => {
				return {
					restaurantId: element.restaurant.id,
					name: element.restaurant.name,
					cuisine: element.restaurant.cuisines,
					url: element.restaurant.url,
					address: element.restaurant.location.address,
					zipCode: element.restaurant.location.zipcode,
					cityId: element.restaurant.location.city_id
				}
			})

			console.log("data to send: ", parsedData)

			res.json({
				status: 200,
				data: parsedData
			})
		})
})


// get route that takes parameter with RESTAURANT ID and queries database (use .populate chained to the Query 
// to get all reviews) and if such a restaurant is in YOUR database, send back the found restaurant

// router.get('/:id')

module.exports = router;