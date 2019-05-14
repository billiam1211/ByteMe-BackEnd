const express 		= require('express');
const router 		= express.Router();
const dotenv 		= require('dotenv').config()
const bcrypt 		= require('bcryptjs');
const superagent 	= require('superagent')
const Experience 	= require('../models/experience.js');
const User 			= require('../models/user.js');
const Restaurant 	= require('../models/restaurant.js')


// GET Request for 
router.get('/', (req, res, next) => {
		console.log(process.env.apiKey);
		const apiKey = process.env.apiKey
		superagent
			.get(`https://developers.zomato.com/api/v2.1/search?q=${req.query.searchTerm1}`)
			.set('user-key', apiKey)
			.then((data) => {
				const actualData = JSON.parse(data.text)
				console.log(actualData.restaurants[0].restaurant.name);
				// Should I map the actual data to a smaller object? If so, how? 
				// All attempts to use .map() have not worked properly
				res.json({
					status: 200,
					data: actualData.restaurants
				})
			})
}) 




// https://developers.zomato.com/api/v2.1/search?entity_type=city&q=greek&sort=real_distance&order=asc
// https://developers.zomato.com/api/v2.1/search?entity_id=Chicago
// &q=${req.query.searchTerm}&sort=rating&order=asc





module.exports = router;