const express = require("express");
const router  = express.Router();
var  Artist  = require('../models/artists');


router.get("/",function (req,res){
	res.send(reponse.data)
	Artist.find({},function(err, artists){
		if(err){
			err.status = 404,
			res.send(err)
		}
	res.json(artists)	
	})
});



router.get("/artist/:id",function (req,res){
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