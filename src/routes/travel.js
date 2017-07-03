const express = require("express");
const router  = express.Router();
var Travel   = require('../models/travel')
var User 	 = require("../models/user");
var Review 	 = require("../models/review");

router.get("/",function (req,res){
	Travel.find({})
    .deepPopulate('user', {populate: {user: {select: 'firstName lastName _id'}}})
    .exec(function(err, travels){
		if(err){
			err.status = 404,
			res.send(err)
		}
	res.json(travels)	
	})
});

router.post("/newtravel",function (req,res){
      console.log(req.body)
      res.send(req.body)
  });

router.route("/:travelId")
      .get(function(req, res, next){
      if(req.user){      
		Travel.findById(req.params.travelId)
		 	  .exec(function(err, travel){
			if(!course){
				res.status = 401
				return next(err)
			} else {
       			res.status(200).json(travel);
			}
		  });	
  	  	}
	})	
     .put(function(req, res,next) {
    var id = req.params.travelId;
    Travel.findByIdAndUpdate(id, { 
    	$set: {
    		passagers : req.body.passager,
    }},{new:true},
        function(err,update) {
            if (err) {
                return next(err);
            }
            res.status(204);
            res.location("/");
            res.end();
        }); 
	});


module.exports = router