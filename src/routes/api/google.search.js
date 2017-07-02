'use strict'

const express = require("express");
const router  = express.Router();
var google = require('googleapis');
var util = require('util');
const resultSearch = new Array();
const createClient = new Object();
var origin;
var destination;



var googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyBDxB0YAtqEVlm5aI-FsYi5tHiXK-oqv4A'
});



router.post("/maps",function(req,res){


if (Array.isArray([req.body.origin]) === true &&
	Array.isArray([req.body.destination]) === true ) {
	console.log("ARRAY")
	
	origin = (req.body.origin.formatted_address).toString()
	destination = (req.body.destination.formatted_address).toString()

} else {
		console.log("NO ARRAY")
	origin = req.body.origin
	destination = req.body.destination
}

const location = googleMapsClient.directions({
	origin: origin,
	destination: destination
}, function(err, data) {
  if (!err) {
  	res.send(data)
    // resultSearch.push(response.data.json.routes[0].legs[0].end_location.lng)
  }
  });

});
module.exports = router