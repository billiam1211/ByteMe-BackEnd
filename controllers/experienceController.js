const express 		= require('express');
const router 		= express.Router();

const dotenv 		= require('dotenv').config()
const bcrypt        = require('bcryptjs');

const Experience 	= require('../models/experience.js');
const User          = require('../models/user.js');
const Restaurant    = require('../models/restaurant.js')




///////////////////////
// CREATE Experience //
///////////////////////
router.post('/', async (req, res, next) => {
	console.log('Hit experience create route');

    // find the id of the logged in user
    console.log(req.session.user._id);
    
    try {
        const foundUser = await User.findById(req.session.user._id)
        console.log(foundUser);

        // create an experience object. Rating, review, and restaurantId will come from the front end
        // logged in user data will be pulled from the session
        const experience = {
            restaurantname: req.body.restaurantName,
            title: req.body.title,
            restaurantId: req.body.restaurantId,
            userId: req.session.user._id,
            username: req.session.user.username,
            review: req.body.review,
            rating: req.body.rating
        }


        // Push the listing we just created into the listings array of the foundUser
        const createdExperience = await Experience.create(experience)
        console.log(createdExperience);
        await foundUser.experiences.push(createdExperience);
        await foundUser.save()
        console.log('======================');
        console.log("foundUser: ", foundUser);
        console.log('======================');

        res.json({
            status: 200,
            data: "Experience created"
        }) 

    } catch (err) {
        next(err)
    }
}) // END OF EXPERIENCE CREATE



///////////////////////////////////////
// GET EXPERIENCES FOR 1 RESTAURANT //
//////////////////////////////////////
router.get('/:id', async (req, res, next) => {
    console.log('hit get reviews route');

    try{

        const foundReviews = await Experience.find({restaurantId: req.params.id})
        res.json({
            status: 200,
            data: foundReviews,
        })


    }catch(err){
        next(err)
    }
})





/////////////////////
// SHOW EXPERIENCE //
/////////////////////
// router.get('/:id', async (req, res, next) => {
// 	console.log('Hit experience show route');
//     try {
//         const foundExperience = await Experience.findById(req.params.id)
//         res.json({
//             status: 200,
//             data: foundExperience
//         })
//     } catch (err) {
//         next(err)
//     }
// }) // END OF EXPERIENCE SHOW











module.exports = router;