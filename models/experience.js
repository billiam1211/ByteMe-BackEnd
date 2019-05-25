const mongoose = require('mongoose');


const experienceSchema = new mongoose.Schema({
	  review: {type: String},
	  restaurantId: {type: String},
	  userId: {type: String},
	  username: {type: String}
});



module.exports = mongoose.model('Experience', experienceSchema);
