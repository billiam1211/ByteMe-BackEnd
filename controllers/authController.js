const express     = require('express');
const router      = express.Router();
const experience  = require('../models/experience.js');
const User        = require('../models/user.js');
const bcrypt      = require('bcryptjs');


// LOGIN:
// app.post()
// This route will be on an auth controller and will log 
// that there is a new user and that sets the session username 
// to req.body.username so that the user can access features 
// that are restricted to only logged in users. 
// This will be accessible in the header component of the application 
// and will allow users to log in from any page.
router.post('/login', async (req, res, next) => {
  try {
    console.log('route is being hit');
    const foundUser = await User.findOne({username: req.body.username});
    console.log(foundUser);
    if(foundUser){
      if(bcrypt.compareSync(req.body.password, foundUser.password)){
        req.session.username = req.body.username;
        req.session.message = '';
        req.session.logged = true;
        res.json({
          status: 200,
          data: foundUser
        })
      } else {
        req.session.message = "Username or password is incorrect";
      }
    } else {
      req.session.message = 'Username or Password is incorrect';
    }
  } catch(err){
    next(err);
  } 

});






module.exports = router;