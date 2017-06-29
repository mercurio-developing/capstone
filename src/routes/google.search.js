'use strict'

const express = require("express");
const router  = express.Router();
var google = require('googleapis');
var util = require('util');
const resultSearch = new Array();
const createClient = new Object();

var youtube = google.youtube({
  version: 'v3',
  auth: "AIzaSyBExANSRh5djbndw0--QxN6ulEN6DcKetQ" 
});


router.post("/search",function(req,res){
  // a very simple example of searching for youtube videos
  console.log(req.body)

 var request1 = youtube.search.list({
     part: 'id,snippet',
     q: req.body.query
   }, function (err, data) {
     if (err) {
       console.error('Error: ' + err);
     }
     if (data) {
       // var videoId = data.items[0].id.videoId
       res.send(data)
       }
   })
});

router.get("/maps",function(req,res){

var googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyBDxB0YAtqEVlm5aI-FsYi5tHiXK-oqv4A'
});

// Geocode an address.
googleMapsClient.geocode({
  address: '1027 vista grande drive, Colorado Springs, CO'
}, function(err, response) {
  if (!err) {
    res.send(response.json.results);
  }
});
});
module.exports = router