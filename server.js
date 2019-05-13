const express        = require('express');
const app            = express();
const bodyParser     = require('body-parser');
const cors           = require('cors');
const session        = require('express-session')

require('./db/db');

//CORS Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// Require the controller after the middleware
const experienceController 	= require('./controllers/experienceController');
const userController 	   	= require('./controllers/userController')
const authController  	   	= require('./controllers/authController');

const corsOptions = {
  origin: 'http://localhost:3000', 
  credentials: true,
  optionsSuccessStatus: 200 
}

app.use(cors(corsOptions));


app.use('/api/v1/users', userController);
app.use('/api/v1/experiences', experienceController)
app.use('/auth', authController);
app.use(session({
	secret: 'chuck norris',
	resave: false,
	saveUnitialized: false
}))


app.listen(process.env.PORT || 9000, () => {
  console.log('listening on port 9000');
});