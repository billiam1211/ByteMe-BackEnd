const express 			= require('express');
const app 				= express();
const bodyParser 		= require('body-parser');
const methodOverride 	= require('method-override')
const cors 				= require('cors');
const session 			= require('express-session');
const bcrypt 			= require('bcryptjs');
const dotenv 			= require('dotenv').config()



// REQUIRE DATABASE
require('./db/db');



// REQUIRE CONTROLLERS
const experienceController 	= require('./controllers/experienceController');
const userController 		= require('./controllers/userController');
const authController 		= require('./controllers/authController');
const restaurantController 	= require('./controllers/restaurantController');



// MIDDLEWARE
app.use(methodOverride('_method'));
app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(session({
    secret: 'chuck norris',
    resave: false,
    saveUninitialized: false
}))



const corsOptions = {
    origin: process.env.FRONTEND_URL,
    credentials: true,
    optionsSuccessStatus: 200
}



app.use(cors(corsOptions));

app.use('/api/v1/users', userController);
app.use('/api/v1/experiences', experienceController)
app.use('/api/v1/restaurants', restaurantController)
app.use('/auth', authController);



// SERVER LISTENING
app.listen(process.env.PORT, () => {
    console.log('listening on port ', process.env.PORT);
});