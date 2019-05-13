const mongoose = require('mongoose');


const experienceSchema = new mongoose.Schema({
  title: 		{type: String},
  description: 	{type: String},
  restaurantId: {type: String}
});



module.exports = mongoose.model('Experience', experienceSchema);
