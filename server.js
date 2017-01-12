//setup packages I need to use

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Assignment = require('./models/assignment');
var dotenv = require('dotenv').config();
var port = process.env.PORT || 8080;
mongoose.connect(process.env.MONGODB_LINK);

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

var router = express.Router();
router.use(function(req, res, next) {
  console.log('Its ALIVE');
  next();
});
app.use('/', router)
app.listen(port);
console.log('Got it up going high when they go low');
