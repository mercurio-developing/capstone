'use strict'

const express = require("express");
const router  = express.Router();
var google = require('googleapis');
var util = require('util');
const resultSearch = new Array();
const createClient = new Object();
var origin;
var destination;
router.post("/maps",function(req,res){

var googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyBDxB0YAtqEVlm5aI-FsYi5tHiXK-oqv4A'
});



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

googleMapsClient.directions({
	origin: origin,
	destination: destination
}, function(err, response) {
  if (!err) {
    res.send(response);
  }
  });


});
module.exports = router