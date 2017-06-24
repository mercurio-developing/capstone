'use strict';

var express = require('express');
var parser = require('body-parser');
var path = require('path');

var list = require('./routes/list');

var Artists  = require('./models/artists')

var app = express();

require('./database');

app.use('/', express.static('app'));
// vendor scripts
app.get('/vendor/angular.js', function(req, res) {
  res.sendFile(path.join(__dirname, '../node_modules', 'angular', 'angular.js'));
});
app.get('/vendor/angular-route.js', function(req, res) {
  res.sendFile(path.join(__dirname, '../node_modules', 'angular-route', 'angular-route.js'));
});
app.use(parser.json());

app.use('/list', list);

app.listen(3000, function() {
    console.log("The server is running on port 3000!");
});
