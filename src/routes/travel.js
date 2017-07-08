const express = require("express");
const router  = express.Router();
var Travel   = require('../models/travel')
var User 	 = require("../models/user");
var Review 	 = require("../models/review");

router.get("/",function (req,res){
	Travel.find({})
    .populate('creator', 'email firstName lastName _id')
    .deepPopulate('userPassenger', {populate: {userPassenger: {select: 'firstName lastName email _id'}}})
    .exec(function(err, travels){
		if(err){
			err.status = 404,
			res.send(err)
		}
	res.json(travels)	
	})
});

router.post("/newtravel",function (req,res,next){
            
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
                
            // if (req.body[0].state === 'creator' ){

        var time = req.body[0].departureTime
            var date = req.body[0].departureDate
                time = time.toString("HHmmss").
                        replace(/T/, ' ').  
                        replace(/\..+/, '').substr(11, 21) 

                date = date.substr(0,10)       
                console.log(req.body)
     const travel = new Travel({
                creator : userId,
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
                })

        travel.save(function(err, newTravel){
                if(err) {
                    err.status = 400;
                    return next(err)
                }
                userId.travelOfCreator.push(newTravel);
                userId.save(function(err, travel){
                    if(err){
                        err.status = 400;
                        return next(err)
                    } 
                    res.status(201)
                    res.json(travel)
                    res.end()
                });
              });
             }
          });
        }); 



router.route("/:id")
      .get(function(req, res, next){
		Travel.findById(req.params.id)
              .deepPopulate('creator', {populate: {creator: {select: 'firstName lastName email _id'}}})
		 	  .exec(function(err, travel){
			if(!travel){
				res.status = 401
				return next(err)
			} else {
       			res.status(200).json(travel);
			}
		  });	
	})	
     .post(function(req, res,next) {
        
    Travel.findById(req.params.id)
              .exec(function(err, travel){
            if(!travel){
                res.status = 401
                return next(err)
            } else {

            User.findOne({email: req.body[0].email})
                .exec(function (err, user) {
                    if (err) {
                        next (err);
                    } else if (!user) {
                        const err = new Error('User not found.');
                        err.status = 401;
                        return next(err)
                    } else {
                        var userData = user           
                            travel.userPassenger.push(userData);
                            travel.save(function(err, updateUser){
                                    if(err){
                                        err.status = 400;
                                        return next(err)
                                    } 
                                console.log(updateUser)   
                                res.status(201)
                                res.json(updateUser)
                                });
                             }
                        })
                      }
                  });   
        	   })
        
    //     .put(function(req,res,next){
    //         Travel.findByIdAndUpdate({_id:req.params.id},{},{$set:{state:"closed"}},{new:true})
    //           .exec(function(err, travel){
    //         if(!travel){
    //             res.status = 401
    //             return next(err)
    //         } else {
    //             res.status(204);
    //             res.send(travel);
    //       } 
    //     })
    // });

module.exports = router