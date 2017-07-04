'user strict'

const mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);


const Schema =  mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

TravelSchema = new Schema ({

    user: {
            type : ObjectId,
            ref: 'User'
        },
	email : {
		type:String,
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
    passengers:Number,
    passengerAvailable:Number,
    departureDate: String,
    departureTime: String,
    latitud:Number,
    longitud:Number
	}).plugin(deepPopulate, {
  whitelist: [
    'user',
  ]
});

const Travel = mongoose.model('Travel', TravelSchema);
module.exports = Travel;

