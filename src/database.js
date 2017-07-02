'use strict';

var mongoose = require('mongoose');
var Travel   = require('./models/travel');
var User 	 = require("./models/user");
var Review 	 = require("./models/review");
var     data = require('./data/data.json');

var seeder = require('mongoose-seeder');
 
mongoose.connect('mongodb://localhost/easy-travel', function(err) {
  if (err) {
    console.log('Failed connecting to MongoDB!');
  } else {
    console.log('Successfully connected to MongoDB!');
  }
});

const db = mongoose.connection;

db.on("error",function (err){
	console.error("connection error:", err);
});

db.once("open", function(){
		seeder.seed(data).then(function(dbData) {
			console.log("Seedderrr")
		}).catch(function(err) {
		   console.error(err)
		});
});


