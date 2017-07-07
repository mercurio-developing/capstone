'use strict';

const express = require("express");
const router  = express.Router();

var Yelp = require('yelpv3');

var yelp = new Yelp({
  app_id: '-OdNlHWGaPYyijJ6ddcU3w',
  app_secret: 'I6GdPQt4pqkf0UWN8bk9emJ86bpt92IxDAMq89HfjsvrwnvC8089asgH9zVvT9TW'
});

// https://www.yelp.com/developers/documentation/v3/business_search

router.post("/",function (req,res,next){
	
	console.log(req.body)
	
	let latitud = req.body[0].latitud;
    let longitud = req.body[0].longitud;
	console.log(req.body)
	yelp.search({term: 'hotel', latitude:latitud,longitude:longitud,limit: "5",price:"1"})
	
	.then(function (data) {
	    res.send(data)
	})
	.catch(function (err) {
	    console.error(err);
	});
})


module.exports = router