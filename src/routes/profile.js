'use strict';

var express = require("express");
var router = express.Router();
var User = require("../models/user");
var Review = require("../models/review");
var Travel = require("../models/travel");

router.get("/:id",function(req, res, next){
		User.findById(req.params.id)
		 	  .exec(function(err, user){
			if(!user){
				res.status = 401
				return next(err)
			} else {

				var userId = user
				var data = new Array()

				data.push(userId)

				Travel.find({creator:userId})
				   	  .deepPopulate('creator', 
				   	  {populate: {creator: {select: 'firstName lastName email _id'}}})
					  .populate('passenger','firstName lastName email _id')
					  .exec(function(err, travels){
					  	if(!user){
						res.status = 401
						return next(err)
					} else {

				data.push(travels)

				Travel.find({userPassenger:userId})
				   	  .deepPopulate('creator', 
				   	  {populate: {creator: {select: 'firstName lastName email _id'}}})
					  .populate('passenger','firstName lastName email _id')
					  .exec(function(err, travelsPas){
					  	if(!user){
						res.status = 401
						return next(err)
					} else {
				
				data.push(travelsPas)

				Review.find({user:userId})
					  .populate('passenger','firstName lastName email _id')
					  .exec(function(err, reviews){
					  	if(!user){
						res.status = 401
						return next(err)
					} else {
						data.push(reviews)
						res.status(200)
						res.send(data)
					}
				    });	
			 	}
			    });	
			 }
	     
	     	});			  
			}
		 
		  });	
		})




router.post("/new_review/:id", function(req,res,next){

		var date = new Date().toISOString().//date to string using ISO standard
            replace(/T/, ' ').      // replace T with a space
            replace(/\..+/, '');   // delete the dot and everything after
            date = date.substr(0,10); //and use only 10 character and delete the rest
		
		User.findById(req.params.id,function(err, user){
		var	userId = user
		const review = new Review({
			user: userId,
			passenger : req.body[0].creator,
			description: req.body[0].description,
			rating:Number(req.body[0].rating),
			postedOn : date
		})
		console.log(review)
		review.save(function(err, newReview){
   	  			if(err) {
   	  				err.status = 400;
   	  				return next(err)
   	  			}
   	  			res.status = 201;
   	  			res.send(newReview)
   	  		});
		});
	});





module.exports = router;