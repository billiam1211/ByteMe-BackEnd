const express = require('express');
const router = express.Router();
const Experience = require('../models/experience.js');
const User = require('../models/user.js');
const bcrypt = require('bcryptjs');


// CREATE Experience:
// Router.post('/')
// POST /experiences
// This route will create a new experience that will contain 
// a user ID and also a restaurant ID so that it can be populated later
// Redirect back to user account page
router.post('/', async (req, res, next) => {
	try {
		const createdExperience = await Experience.create(req.body)
		// also will need to find the restaurant ID and store it for this step
		res.json({
			status: 200,
			data: createdExperience
		})
	} catch (err) {
		next(err)
	} 
})




// SHOW EXPERIENCE:
// Router.get('/experiences/:id')
// Locate the experience based on id and populate all the experiences tied to the user
router.get('/:id', async (req, res, next) => {
	try {
		const foundExperience = await Experience.findById(req.params.id)
		res.json({
			status: 200,
			data: foundExperience
		})
	} catch (err) {
		next(err)
	}
})




// UDPATE EXPERIENCE: 
// PUT /:id -- Will query the database for experiences that have the same user id as 
// the user that is logged in and update the current experience so that the DB is 
// updated with the new information
router.put('/:id', async (req, res, next) => {
	try {
		const updatedExperience = {
			title: req.body.title,
			description: req.body.description,
			restaurantId: req.body.restaurantId
		}
		const foundExperience = await Experience.findByIdAndUpdate(req.params.id, updatedExperience, {new: true});
		await foundExperience.save();
		res.json({
			status: 200,
			data: foundExperience
		})
	} catch(err) {
		next(err)
	}
})




// EXPERIENCE DELETE:
// Router.delete('/:id') 
// Will query the database and remove the specified 
// experience when the 'DELETE' button is submitted on 
// the experience edit page
router.delete('/:id', async (req, res, next) => {
	try {
		const foundExperience = await Experience.findById(req.params.id);
		res.json({
			status: 200,
			data: foundExperience
		})
	} catch(err) {
		next(err)
	}
})


module.exports = router;







