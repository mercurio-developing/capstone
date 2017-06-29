'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var jwt = require("jsonwebtoken");
const jwtExpress = require("express-jwt");
const secretKey = "ale"
var cors = require('cors')


var list = require('./routes/list');
var user = require('./routes/user');
var login = require('./routes/login');
var google  = require('./routes/google.search')


var Artists  = require('./models/artists')
var User 	 = require("./models/user");

var app = express();

app.use(cors())
app.use(cors({origin:true,credentials: true}));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// app.use('/api', jwtExpress({secret: secretKey}));

require('./database');

app.use('/', express.static('app'));
// vendor scripts
app.get('/vendor/angular.js', function(req, res) {
  res.sendFile(path.join(__dirname, '../node_modules', 'angular', 'angular.js'));
});

app.get('/vendor/ng-videosharing-embed.js', function(req, res) {
  res.sendFile(path.join(__dirname, '../node_modules', 'ng-videosharing-embed','build','ng-videosharing-embed.min.js'));
});

// app.get('/vendor/angular-route.js', function(req, res) {
//   res.sendFile(path.join(__dirname, '../node_modules', 'angular-route', 'angular-route.js'));
// });


app.use('/api/artists', list);
app.use('/register', user);
app.use('/login', login);
app.use('/api/google', google);



app.listen(3000, function() {
    console.log("The server is running on port 3000!");
});
