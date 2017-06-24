const express = require("express");
const router  = express.Router();
var  Artist  = require('../models/artists');


router.get("/",function (req,res){
	Artist.find({},function(err, artists){
		if(err){
			err.status = 404,
			res.send(err)
		}
	res.json(artists)	
	})
});


router.get("/:id",function (req,res){
	var id = req.params.id;
	// Artist.find({ "id": {$gt : prev, $lt : next}},function(err, artist){
	// 		if(err){
	// 			err.status = 404,
	// 			res.send(err)
	// 		}
	// 		res.json(artist)	
	// 	})

	Artist.find({},function(err, result){
			if(err){
				err.status = 404,
				res.send(err)
			}
			res.json(result)	
		})

});

module.exports = router