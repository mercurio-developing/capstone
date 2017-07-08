'user strict'

var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var Schema =  mongoose.Schema,
	ObjectId =  Schema.Types.ObjectId

ReviewSchema = new Schema ({

	user: {
			type : ObjectId,
			ref: 'User'
		},
	passenger:[{
            type : ObjectId,
            ref: 'User'
    }],
	postedOn: {
		type: Date,
		default: Date.now
	},
	rating: {
		type:Number,
		min: 1,
		max: 5 
	},
	description: String
}).plugin(deepPopulate, {
  whitelist: [
    'user',
  ]
});


const Review = mongoose.model("Review", ReviewSchema);
module.exports = Review;