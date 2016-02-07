var express = require('express')
var Node = express()



var apiai = require('apiai');
 
var app = apiai("a3c5981fbb6a44cda1f428b5da4361f0", "1055e537-3ab0-4f92-b3a4-e2d7342bfc7f");
 
 //input text font end to backend
var request = app.textRequest('hi');
 
request.on('response', function(response) {
    console.log(response);
})
 
request.on('error', function(error) {
    console.log(error);
})
 
request.end()

Node.listen(9000, function () {
  console.log('Example app listening on port 9000!')
})