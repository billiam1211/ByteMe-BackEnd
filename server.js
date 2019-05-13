const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override')
const cors = require('cors');
const session = require('express-session');
const bcrypt = require('bcryptjs');


// REQUIRE DATABASE
require('./db/db');


// REQUIRE CONTROLLERS
const experienceController 	= require('./controllers/experienceController');
const userController 		= require('./controllers/userController')
const authController 		= require('./controllers/authController');


// MIDDLEWARE
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(methodOverride('_method'));
app.use(express.static('public'))
app.use(bodyParser.json());
// Require the controller after the middleware
app.use(session({
    secret: 'chuck norris',
    resave: false,
    saveUninitialized: false
}))

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

app.use('/api/v1/users', userController);
app.use('/api/v1/experiences', experienceController)
app.use('/auth', authController);



// SERVER LISTENING
app.listen(process.env.PORT || 9000, () => {
    console.log('listening on port 9000');
});