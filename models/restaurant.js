const mongoose = require('mongoose');


const restaurantSchema = new mongoose.Schema({
  id: 			{type: String},
  name: 		{type: String},
  phone: 		{type: String},
  location: 	{type: String},
  url: 			{type: String},
  delivery: 	{type: Boolean},
  cuisine: 		{type: String},
  zipcode: 		{type: String},
  rating: 		{type: String} 



});



module.exports = mongoose.model('Restaurant', restaurantSchema);