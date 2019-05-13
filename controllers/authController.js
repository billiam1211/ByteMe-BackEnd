const express = require('express');
const router = express.Router();
const Experience = require('../models/experience.js');
const User = require('../models/user.js');
const bcrypt = require('bcryptjs');


// LOGIN:
// app.post()
// This route will be on an auth controller and will log 
// that there is a new user and that sets the session username 
// to req.body.username so that the user can access features 
// that are restricted to only logged in users. 
// This will be accessible in the header component of the application 
// and will allow users to log in from any page.
router.post('/', async (req, res) => {
  console.log(req.body, '<=== this is session')

  try {
    const foundUser = await User.findOne({userName: req.body.userName});
    // console.log(foundUser);
    if(foundUser){
      if(bcrypt.compareSync(req.body.password, foundUser.password) === true){
        req.session.message = '';
        req.session.logged = true;
        req.session.usersDbId = foundUser._id;
        console.log(req.session.usersDbId + '<=== Session userDbId');
        // console.log(req.session, ' successful in login')
        res.redirect(`/users/${foundUser._id}`);
      } else {
        req.session.message = "Username or password is incorrect";
        res.redirect('/');
      }
    } else {
      req.session.message = 'Username or Password is incorrect';
      res.redirect('/');
    }
  } catch(err){
    next(err);
  } 

});


module.exports = router;