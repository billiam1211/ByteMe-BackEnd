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
  console.log(req.body, ' this is session')

  try {

    // const user = await User.create(req.body);
    // req.session.logged = true;
    // req.session.username = req.body.username;
    // res.json({
    //   status: 200,
    //   data: 'login successful'
    // });

    res.send({type: 'POST REQUEST HIT POSTMAN'})


  } catch(err){
    console.log(err);
    res.send(err);
  }
});








module.exports = router;