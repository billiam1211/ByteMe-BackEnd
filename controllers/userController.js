const express = require('express');
const router = express.Router();
const Experience = require('../models/experience.js');
const User = require('../models/user.js');
const bcrypt = require('bcryptjs');




// USER SHOW:
router.get('/:id', async (req, res, next) => {
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
	} catch(err) {
		next(err)
	}
});




// CREATE NEW USER ACCOUNT:
router.post('/', async (req, res, next) => {
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
});




// USER EDIT ACCOUNT:
// router.get('/user/:id/edit)
// Check to see if user session ID is true to allow access to this page
// Find user in DB
router.get('/:id/edit', async (req, res) => {
	res.send({type: 'EDIT USER ACCOUNT HIT POSTMAN'})
	if (req.session.usersDbId == req.params.id) {	
		try {
			const foundUser = await User.findById(req.params.id);
			res.json({
				status: 200,
				user: foundUser
			})
			console.log(foundUser + '<--- Found User ');
		} catch(err) {
			res.send(err)
		}
	}
});




// USER UPDATE ACCOUNT:
// PUT /user:id this route will update the user in the database based on ID
// body may include the following fields:
// 	password:
// 	email: 
router.put('/:id', async (req, res) => {
	res.send({type: 'UPDATE USER HIT POSTMAN'})
	if (req.session.usersDbId == req.params.id) {
		try {
			const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
			res.json({
				status: 200,
				data: updatedUser
			})
		} catch(err) {
			res.send(err)
		}
	}
});




// DESTROY USER:

// Router.delete('/user/:id') 
// Will query the database and remove the specified user when 
// the 'DELETE' button is submitted on the account edit page
router.delete('/:id', async (req, res) => {
	res.send({type: 'DELETE USER HIT POSTMAN'})
	try {
		const deletedMovie = await Movie.findByIdAndRemove(req.params.id);
		res.json({
			status: 200,
			data: deletedMovie
	});
		} catch(err){
			res.send(err);
		}

});


module.exports = router;










