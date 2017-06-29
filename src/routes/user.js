'use strict';

var express = require("express");
var router = express.Router();
var User = require("../models/user");
// var mid  = require("../middleware")
var bcrypt = require('bcryptjs');


// //GET user "/"
router.route("/")
      .get(function(req,res,next){
		 if (req.user) {
		 		res.status(200)
		        res.json(req.user);
		    } else {
		    	err.status = 401;
		    	return next(err)
		    }
 		})
// POST "/"
	  .post(function(req, res, next) {
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
		      };
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



module.exports = router;