'use strict';

var express = require("express");
var router = express.Router();
var User = require("../models/user");
var bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

router.post("/",function(req, res,next) {
	  		// create object 

	  		 console.log(req.body)
	  		 
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
			        	email : user.email
			        })
			        });
					} else {
				      var err = new Error('All fields required.');
				      err.status = 400;
				      return next(err);
				    }	
                });

  
module.exports = router;