'use strict';

var express = require("express");
var router = express.Router();
var Travel   = require('../models/travel')
var User 	 = require("../models/user");
var Review 	 = require("../models/review");// var mid  = require("../middleware")
var bcrypt = require('bcryptjs');


router.route("/")
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
		          req.body.password) 
		  {
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
		          console.log(user)
		        }
		      });

		    } else {
		      var err = new Error('All fields required.');
		      err.status = 400;
		      return next(err);
		    }
		});

// // //GET user "/"
router.route("/:userId")
      .get(function(req, res, next){
		User.findById(req.params.userId)
		 	  .exec(function(err, user){
			if(!course){
				res.status = 401
				return next(err)
			} else {
       			res.status(200).json(user);
			}
		  });	
		})		  

module.exports = router;