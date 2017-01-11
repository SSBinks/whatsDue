//setup packages I need to use

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Assignment = require('./models/assignment');
var port = process.env.PORT || 8080;

app.listen(port);
console.log('Got it up going high when they go low');
