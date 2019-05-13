const express = require('express');
const router = express.Router();
const Experience = require('../models/experience.js');
const User = require('../models/user.js');
const bcrypt = require('bcryptjs');


// USER ACCOUNT SHOW:
// router.get('/user/:id) -- return user info and their experiences
// Find a user in our database using the user ID and 
// displays their information on the user component in react. 
// This would also search the database for any experiences that 
// are tied to that user and would populate them as well. 
router.get('/:id', async (req, res) => {
	try {
		res.send({type: 'USER SHOW HIT POSTMAN'})

	} catch(err) {
		res.send(err)
	}

	// User.findById(req.params.id)
	// 	.populate('experiences')
	// 	.exec((err, foundUser) => {
	// 		res.json({
	// 			user: foundUser,
	// 			loggedIn: req.session
	// 		})

	// 	})

});



// CREATE NEW USER ACCOUNT:
// router.post('/user') - create a new user 
// body should include:
router.post('/', async (req, res) => {

	try {
		// const createdUser = await User.create(userDbEntry);
		res.send({type: 'CREATE NEW USER HIT POSTMAN'})
	} catch(err) {
		res.send(err)
	}
	// const password = req.body.password
	// const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
	// const userDbEntry = {};
	// userDbEntry.userName = req.body.userName;
	// userDbEntry.password = passwordHash;
	// try {
	// 	const createdUser = await User.create(userDbEntry);
	// 	if(createdUser){
	// 		req.session.logged = true;
	// 		req.session.usersDbId = createdUser._id;
	// 		// console.log(createdUser);
	// 		req.session.message = "Account Created. Thank you!"
	// 		res.redirect(`/users/${createdUser._id}`)
	// 	} else {
	// 		req.session.message = "A required field is incomplete"
	// 	}
	// } catch(err) {
	// 	res.send(err)
	// }
});


// USER EDIT ACCOUNT:
// router.get('/user/:id/edit)
// Check to see if user session ID is true to allow access to this page
// Find user in DB
router.get('/:id/edit', async (req, res) => {
		try {
			res.send({type: 'EDIT USER ACCOUNT HIT POSTMAN'})
			// const foundUser = await User.findById(req.params.id);
			// res.json({
			// 	user: foundUser
			// })
			// console.log(foundUser);
		} catch(err) {
			res.send(err)
		}
});


// USER UPDATE ACCOUNT:

// PUT /user:id this route will update the user in the database based on ID
// 	// body may include the following fields:
// 	password:
// 	email: 
router.put('/:id', async (req, res) => {
	try {
		res.send({type: 'UPDATE USER HIT POSTMAN'})
		// const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
	} catch(err) {
		res.send(err)
	}
});

// DESTROY USER:

// Router.delete('/user/:id') 
// Will query the database and remove the specified user when the 'DELETE' button is submitted on the account edit page
router.delete('/:id', async (req, res) => {
	try {

		res.send({type: 'DELETE USER HIT POSTMAN'})
		// const deletedUser = await User.findByIdAndRemove(req.params.id);
		// User.deleteMany({
		// 		_id: {
		// 			$in: deletedUser.users
		// 		}
		// 	})
	} catch (err) {
		res.send(err)
	}
});


module.exports = router;










