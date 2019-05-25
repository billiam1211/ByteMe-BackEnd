const express = require('express');
const router = express.Router();
const experience = require('../models/experience.js');
const User = require('../models/user.js');
const bcrypt = require('bcryptjs');


// LOGIN ROUTE (auth/login)
router.post('/login', async (req, res, next) => {
    try {
        console.log('login route is being hit');
        const foundUser = await User.findOne({
            username: req.body.username
        });
        console.log("found user: ", foundUser);
        if (foundUser) {
            if (bcrypt.compareSync(req.body.password, foundUser.password)) {
                req.session.username = req.body.username;
                req.session.user = foundUser
                req.session.message = '';
                req.session.logged = true;
                req.session.message = 'Login Succesful';
                res.json({
                    status: 200,
                    data: foundUser,
                    msg: req.session.message
                })
            } else {
                req.session.message = "Username or password is incorrect";
                res.json({
                    status: 200,
                    data: req.session.message
                })
            }
        } else {
            req.session.message = 'Username or Password is incorrect';
            res.json({
                status: 200,
                data: req.session.message
            })
        }
    } catch (err) {
        next(err);
    }

}); // END OF LOGIN



// LOGOUT route (/auth/logout)
router.get('/logout', async (req, res, next) => {
  console.log('Logout route hit');
  try{
    if(req.session){

        const destroyedSession = await req.session.destroy()
        res.status(200).json({
          status: 200
        })
        
    }
  } catch(err) {
    res.status(400).json({
      status: 400,
      error: error
    })
  }
}) // END OF LOGOUT ROUTE



// app.post()
// This route will be on an auth controller and will log 
// that there is a new user and that sets the session username 
// to req.body.username so that the user can access features 
// that are restricted to only logged in users. 
// This will be accessible in the header component of the application 
// and will allow users to log in from any page.




module.exports = router;