'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var jwt = require("jsonwebtoken");
const jwtExpress = require("express-jwt");
const secretKey = "ale"

var Travel   = require('./models/travel');
var User 	 = require("./models/user");
var Review 	 = require("./models/review");

var travelRoutes   = require('./routes/travel');
var userRoutes 	   = require('./routes/user');
var profileRoutes    = require('./routes/profile');
var googleRoutes   = require('./routes/api/google.search');
var weatherRoutes  = require('./routes/api/weather');
var yelpRoutes     = require('./routes/api/yelp');

var port = process.env.PORT || 8080;



var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use('/api', jwtExpress({secret: secretKey}));

require('./database');

app.use('/', express.static('app'));

app.use('/api/profile'      , profileRoutes);
app.use('/user'   , userRoutes);
app.use('/api/travel' , travelRoutes);
app.use('/api/google' , googleRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/yelp'   , yelpRoutes);



app.listen(port, function() {
    console.log("The server is running on port" + port);
});
