//setup packages I need to use

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Assignment = require('./models/assignment');
var dotenv = require('dotenv');
var port = process.env.PORT || 8080;
mongoose.connect(process.env.MONGODB_LINK);

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.listen(port);
console.log('Got it up going high when they go low');
