'use strict';

var express = require("express");
var router = express.Router();
var Travel   = require('../models/travel')
var User 	 = require("../models/user");
var Review 	 = require("../models/review");
var bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");


router.route("/register")
      .get(function(req, res, next){
		User.find({})
		 	  .exec(function(err, users){
			if(!users){
				res.status = 401
				return next(err)
			} else {
       			res.status(200).json(users);
			}
		  });	
		})

// POST "/"
	  .post(function(req, res, next) {
	  	console.log(req.body)
		  if (req.body.email &&
			     req.body.firstName &&
			   	  req.body.lastName &&
		          req.body.password) {
		      // create object 
		      var userData = {
		        firstName: req.body.firstName,
		        lastName: req.body.lastName,
		        email: req.body.email,
		        password: req.body.password
		      }
		      // use schema's `create` method to insert document into Mongo
		      User.create(userData, function (err, user) {
		        if (err){
		            const err = new Error('That user already exists');
		            err.status = 500;
		            return next(err)
		        } else {
		          res.status(201).location('/').end();
		        }
		      });

		    } else {
		      var err = new Error('All fields required.');
		      err.status = 400;
		      return next(err);
		    }
		});




router.post("/login",function(req, res,next) {
	  		// create object 	  		 
			 if (req.body.email &&
		       	req.body.password) {
		        var email = req.body.email;
                var password = req.body.password		  		
			    User.authenticate(email, password, function (err, user) {
			        if (err) {
			            return next(err);
			        } else if (!user) {
			            res.status(401);
			            return res.send();
			        }
			        var token = user.generateJwt()
			        return res.status(200).json({
			        	token:token,
			        	firstName : user.firstName,
			        	lastName : user.lastName,
			        	email : user.email,
			        	_id : user._id
			       	  })
			        });
				   } else {
				      var err = new Error('All fields required.');
				      err.status = 400;
				      return next(err);
				    }	
                });

module.exports = router;