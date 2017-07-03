'user strict'

const mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);


const Schema =  mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

TravelSchema = new Schema ({

	user : {
		type: ObjectId,
		ref: 'User'
	},
	    origin: {
        type: String,
        required: true
    },
        destination: {
        type: String,
        required: true
    },
        description: {
        type: String,
        required: true
    },
    estimatedTime: String,
    passegers:Number,
    contribution:Number,
    departure:{
        type: Date,
        default: Date.now
    },
    weather : [{
        Tmax: String,
        Tmin: String,
        summary: String,
        icon: String,
    }]
	}).plugin(deepPopulate, {
  whitelist: [
    'user',
  ]
});

const Travel = mongoose.model('Travel', TravelSchema);
module.exports = Travel;

