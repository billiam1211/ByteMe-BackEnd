const express 		= require('express');
const router 		= express.Router();
const Experience 	= require('../models/experience.js');
const User 			= require('../models/user.js');
const bcrypt 		= require('bcryptjs');
const Restaurant 	= require('../models/restaurant.js')
const dotenv 		= require('dotenv').config()


// CREATE Experience:
router.post('/', async (req, res, next) => {
	console.log('Hit experience create route');
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
}) // END OF EXPERIENCE CREATE




// SHOW EXPERIENCE:
router.get('/:id', async (req, res, next) => {
	console.log('Hit experience show route');
    try {
        const foundExperience = await Experience.findById(req.params.id)
        res.json({
            status: 200,
            data: foundExperience
        })
    } catch (err) {
        next(err)
    }
}) // END OF EXPERIENCE SHOW




// UDPATE EXPERIENCE: 
router.put('/:id', async (req, res, next) => {
	console.log('Hit update experience route');
    try {
        const updatedExperience = {
            title: req.body.title,
            description: req.body.description,
            restaurantId: req.body.restaurantId
        }
        const foundExperience = await Experience.findByIdAndUpdate(req.params.id, updatedExperience, {
            new: true
        });
        await foundExperience.save();
        res.json({
            status: 200,
            data: foundExperience
        })
    } catch (err) {
        next(err)
    }
}) // END OF UPDATE EXPERIENCE 




// EXPERIENCE DELETE:
router.delete('/:id', async (req, res, next) => {
	console.log('Delete experience route');
    try {
        const deletedExperience = await Experience.findByIdAndRemove(req.params.id);
        res.json({
            status: 200,
            data: deletedExperience
        })
    } catch (err) {
        next(err)
    }
}) // END OF DELETE EXPERIENCE



module.exports = router;