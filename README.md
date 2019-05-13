# ByteMe-BackEnd
This is the back end express server
Project III - Restaurant Finder Application

USER STORIES:
1) User will use the application to find local dining options proximate to them using their zip code.
2) From the HOME page, the user will have 2 options: Register & Create Account OR enter zip code.
3) Selecting the Register option will take the user to a page where they are prompted to enter account information: email, password, zip code, and preference. 
4) Upon successful creation and entering all the required fields, the user will be redirected to their account page showing all the previously entered information. Users that are logged in will be able to 	edit and update their information via edit page and post route. 
5) Users will also be able to create a favorites list on their account show page. Favorites list will also have unique experiences and comments about the restaurant. 
6) Users that enter a zip code from the Home page will be redirected to an index page showing a list of restaurants that are within the specified zip code. 
7) User can select a restaurant location to get additional information on that specific restaurant.
8) When selected, restaurant show page will show information such as: Name, Cuisine, Prices, Address, Contact information, Ratings (public)

Stretch Goals:
1) On the restaurant index page, registered users will have access to advanced search options including: Category Search via dropdown windows, Searching through a search box with queries
2) User reviews and experiences will be posted to the restaurant that they are tied to on that restaurant's display page.
3) Provide a google map view, where user can have a different experience of viewing restaurants on a map based on how close they are to their present location
4) Top picks view > Site visitors will have access to an additional page that displays all of the user reviews on restaurants 

API DOCUMENTATION:

HOME:
app.get('/'
This will direct the user to the home page of the application

RESTAURANT INDEX:
router.get('/restaurant)
Route will make a request to the 3rd party api for a json feed of the restaurants who's zip code is = to the input on the home page
 
RESTAURANT SHOW:
router.get('/restaurant/:id) makes a request for a restaurant with a specific ID and shows that restaurant along with all of its details and any reviews from users that are related to that specific restaurant 

LOGIN:
app.post()
This route will be on an auth controller and will log that there is a new user and that sets the session username to req.body.username so that the user can access features that are restricted to only logged in users. This will be accessible in the header component of the application and will allow users to log in from any page.

CREATE USER ACCOUNT:

router.post('/user') - create a new user 
	body should include:

USER ACCOUNT SHOW:

router.get('/user/:id) -- return user info and their experiences
Find a user in our database using the user ID and displays their information on the user component in react. 
This would also search the database for any experiences that are tied to that user and would populate them as well. 

USER EDIT ACCOUNT:

router.get('/user/:id/edit)
Check to see if user session ID is true to allow access to this page
Find user in DB

DESTROY USER:

Router.delete('/user/:id') 
Will query the database and remove the specified user when the 'DELETE' button is submitted on the account edit page

USER UPDATE ACCOUNT:

PUT /user:id this route will update the user in the database based on ID
	// body may include the following fields:
	password:
	email: 
	
Create Experience:

Router.get('/')
POST /experiences
This route will create a new experience that will contain a user ID and also a restaurant ID so that it can be populated later
Redirect back to user account page

SHOW EXPERIENCE:

Router.get('/experiences/:id')
Locate the experience based on id and populate all the experiences tied to the user

EXPERIENCE UDPATE:

PUT /:id -- Will query the database for experiences that have the same user id as the user that is logged in and update the current experience so that the DB is updated with the new information

EXPERIENCE DELETE:

Router.delete('/:id') 
Will query the database and remove the specified experience when the 'DELETE' button is submitted on the experience edit page
