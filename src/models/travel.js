'user strict'

const mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);


const Schema =  mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

TravelSchema = new Schema ({
    creator:{
        type : ObjectId,
        ref: 'User'
    },
    userPassenger:[{
            type : ObjectId,
            ref: 'User'
    }],
	email : {
		type:String
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
    passengers: Number,
    estimatedTime: String,
    departureDate: String,
    departureTime: String,
    latitud:Number,
    longitud:Number,
    state:Boolean
	}).plugin(deepPopulate, {
  whitelist: [
    'creator',
    'userPassenger'
  ]
});

const Travel = mongoose.model('Travel', TravelSchema);
module.exports = Travel;

