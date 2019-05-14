const express = require('express');
const router = express.Router();
const Experience = require('../models/experience.js');
const User = require('../models/user.js');
const bcrypt = require('bcryptjs');
const Restaurant 	= require('../models/restaurant.js')

// USER SHOW:
router.get('/:id', async (req, res, next) => {
    console.log(process.env.apiKey)
	console.log('Hit the user show route');
    try {
        // find user by id and populate all the experiences
        // that belong to that user
        const foundUser = User.findById(req.params.id)
            .populate('experiences')
            .exec((err, foundUser) => {
                res.json({
                    status: 200,
                    data: foundUser
                })
            })
    } catch (err) {
        next(err)
    }
}); // END OF USER SHOW




// CREATE NEW USER ACCOUNT:
router.post('/', async (req, res, next) => {
	console.log('Hit User Post route...');
    const password = req.body.password
    const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const userDbEntry = {};
    userDbEntry.username = req.body.username;
    userDbEntry.password = passwordHash;
    userDbEntry.email = req.body.email;
    try {
        const createdUser = await User.create(userDbEntry)
        await createdUser.save()
        req.session.logged = true;
        req.session.usersDbId = createdUser._id;
        console.log(createdUser);
        res.json({
            status: 200,
            data: createdUser
        })
    } catch (err) {
        next(err)
    }
}); // END OF CREATE USER




// USER UPDATE ACCOUNT:
router.put('/:id', async (req, res, next) => {
	console.log('Hit User update route');
    try {
    	console.log('');
        const updatedUser = {
        	username: req.body.username,
        	description: req.body.description,
        	email: req.body.email
        }
        const foundUser = await User.findByIdAndUpdate(req.params.id, updatedUser, {new: true})
        await foundUser.save();
        res.json({
            status: 200,
            data: foundUser
        })
    } catch (err) {
        next(err)
    }
}); // END OF USER UPDATE






// DESTROY USER:
router.delete('/:id', async (req, res, next) => {
	console.log('hit user delete route');
    try {
    	console.log('Hit Delete Route');
        const deletedUser = await User.findByIdAndRemove(req.params.id);
        res.json({
            status: 200,
            data: deletedUser
        });
    } catch (err) {
        next(err);
    }
}); // END OF DELETE USER 




// USER EDIT ACCOUNT:  // <--- Dont think I need this route...
// router.get('/user/:id/edit)
// Check to see if user session ID is true to allow access to this page
// Find user in DB
// router.get('/:id/edit', async (req, res, next) => {
// 	try {
// 		const foundUser = await User.findById(req.params.id);
// 		res.json({
// 			status: 200,
// 			user: foundUser
// 		})
// 		console.log(foundUser + '<--- Found User ');
// 	} catch(err) {
// 		next(err)
// 	}
// });




module.exports = router;