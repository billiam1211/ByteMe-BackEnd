const express 		= require('express');
const router 		= express.Router();
const Experience 	= require('../models/experience.js');
const User 			= require('../models/user.js');
const bcrypt 		= require('bcryptjs');
const Restaurant 	= require('../models/restaurant.js')
const dotenv 		= require('dotenv').config()


// CREATE Experience:
router.post('/', async (req, res, next) => {
    const foundUser = User.findById(req.session.user._id)
    console.log(foundUser, '<-- Found user');
    // find user by id to get username
	console.log('Hit experience create route');
        const experience = {
            restaurantId: req.body.restaurantId,
            userId: req.session.user._id,
            review: req.body.review,
            username: req.session.username
            // add username from query above ^^^
        }
    
    try {
        console.log('Experience ==>',experience);
        const createdExperience = await Experience.create(experience)
        // also will need to find the restaurant ID and store it for this step
        await createdExperience.save()
        console.log('Created experience ==>',createdExperience);
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