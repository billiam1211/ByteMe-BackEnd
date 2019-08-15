const mongoose = require('mongoose');


const experienceSchema = new mongoose.Schema({
	restaurantname: { type: String },
	title: 			{ type: String },
	review: 		{ type: String },
	restaurantId: 	{ type: String },
	userId: 		{ type: String },
	username: 		{ type: String },
	rating: 		{ type: Number, min: 1, max: 5 }
});



module.exports = mongoose.model('Experience', experienceSchema);
