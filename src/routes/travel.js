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

router.post("/newtravel",function (req,res,next){
       
       var time = req.body[0].departureTime
            var date = req.body[0].departureDate
                time = time.toString("HHmmss").
                        replace(/T/, ' ').  
                        replace(/\..+/, '').substr(11, 21) 

                date = date.substr(0,10)
                console.log(req.body)
                console.log(req.body[0].email)
       User.findOne({email: req.body[0].email})
        .exec(function (err, user) {
            if (err) {
                return callback(err);
            } else if (!user) {
                const err = new Error('User not found.');
                err.status = 401;
                return next(err)
            } else {
            
            var userId = user
                
            var travelData = {
                user : userId,
                origin: req.body[0].origin,
                destination: req.body[0].destination,
                estimatedTime: req.body[0].estimatedTime,
                passengers: req.body[0].passengers,
                passengerAvailable : req.body[0].passengers,
                description: req.body[0].description,
                departureDate:date,
                departureTime:time,
                latitud: req.body[0].latitud,
                longitud: req.body[0].longitud

                }
          
           Travel.create(travelData,function (err, travel) {
                if (err){
                    const err = new Error('That travel already exists');
                    err.status = 500;
                    return next(err)
                } else {
                  console.log(travel)
                  res.status(201).location('/').end();
                }
              });
           
            }
          });
        }); 



router.route("/:id")
      .get(function(req, res, next){
        console.log(req.params.id)
		Travel.findById(req.params.id)
              .deepPopulate('user', {populate: {user: {select: 'firstName lastName email'}}})
		 	  .exec(function(err, travel){
			if(!travel){
				res.status = 401
				return next(err)
			} else {
       			res.status(200).json(travel);
			}
		  });	
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