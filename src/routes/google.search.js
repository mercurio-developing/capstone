'use strict'

const express = require("express");
const router  = express.Router();
var google = require('googleapis');
var sampleClient = require('./api');
var util = require('util');
const resultSearch = new Array();

var youtube = google.youtube({
  version: 'v3',
  auth: "AIzaSyBExANSRh5djbndw0--QxN6ulEN6DcKetQ" 
});



router.get("/",function(req,res){
  // a very simple example of searching for youtube videos

 var request1 = youtube.search.list({
     part: 'id,snippet',
     q: 'Accept - Ball to the Walls'
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




module.exports = router