'use strict';

const express = require("express");
const router  = express.Router();
var util = require('util');

var DarkSky = require('forecast.io');

var options = {
  APIKey: "9d4991dd7dcbc47697184fee96dd8ee3",
  timeout: 1000
},

darksky = new DarkSky(options);

router.post('/',function(req,res){

  let latitud = req.body[0].latitud;
  let longitud = req.body[0].longitud;

  darksky.get(latitud,longitud,function (err,data) {
  if (err) throw err;
  res.send(data.body);
});

}) 


module.exports = router