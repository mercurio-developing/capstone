'use strict';

var mongoose = require('mongoose');
var  Artist  = require('./models/artists');
var     data = require('./data/data.json');

  var seeder = require('mongoose-seeder');
 
mongoose.connect('mongodb://localhost/artists-todo', function(err) {
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
		seeder.seed(data).then(function(Artist) {
			console.log("Seedderrr")
		}).catch(function(err) {
		   console.error(err)
		});
});


