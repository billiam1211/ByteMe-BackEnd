const User          = require('../models/user.js');
const Experience    = require('../models/experience.js');
const express       = require('express');
const router        = express.Router();
const bcrypt        = require('bcryptjs');
const dotenv        = require('dotenv').config()


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
                    status: 401,
                    msg: req.session.message
                })
            }
        } else {
            req.session.message = 'User not found, check username or password';
            res.json({
                status: 401,
                msg: req.session.message
            })
        }
    } catch (err) {
        next(err);
    }
}); // END OF LOGIN



// User Logout Route
router.delete('/logout', async (req,res,next) => {
    console.log('hit the logout route');
    if(req.session){
        try {
          const deletedSession = await req.session.destroy((err) => {
              res.json({
                status: 200,
                data: 'You have successfully logged out.'
              })
          })
        console.log(deletedSession);
        } catch(err) {
          next(err)
        }
      }
}) // End of user logout route



// app.post()
// This route will be on an auth controller and will log 
// that there is a new user and that sets the session username 
// to req.body.username so that the user can access features 
// that are restricted to only logged in users. 
// This will be accessible in the header component of the application 
// and will allow users to log in from any page.




module.exports = router;