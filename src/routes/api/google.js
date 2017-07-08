'use strict'

const express = require("express");
const router  = express.Router();
var google = require('googleapis');
var origin;
var destination;



var googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyCloG6KeNWUu9OJyKFHoskqT_1hG14fgtE'
});

router.post("/maps",function(req,res){


if (Array.isArray([req.body.origin]) === true &&
	Array.isArray([req.body.destination]) === true ) {
	
	origin = (req.body.origin.formatted_address).toString()
	destination = (req.body.destination.formatted_address).toString()

} else {
	origin = req.body.origin
	destination = req.body.destination
}

const location = googleMapsClient.directions({
	origin: origin,
	destination: destination
}, function(err, data) {
  if (!err) {
  	res.send(data)
  }
  });

});
module.exports = router