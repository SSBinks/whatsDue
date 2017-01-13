//setup packages I need to use

var express = require('express');
var app = express();
var moment = require('moment');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Assignment = require('./models/assignment');
var dotenv = require('dotenv').config();
var port = process.env.PORT || 8000;
mongoose.connect(process.env.MONGODB_LINK);

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

var router = express.Router();
router.use(function(req, res, next) {
  console.log('Its ALIVE');
  next();
});

router.route('/assign')
.post( function(req, res){
  var assign = new Assignment();
  assign.title = req.body.title;
  assign.dueDate = moment(req.body.dueDate).format('L');
  assign.progress = req.body.progress;
  assign.complete = req.body.complete;

  assign.save(function(err){
    if(err)
    res.send(err);
    res.json({ message: "Come on ladies let us get into formation"});
  });
});

router.route('/assign/:due_date')
.get(function(req, res) {
  Assignment.find({dueDate: moment(req.params.due_date).format('L')}, function (err, assignment){
    if(err)
    res.send(err);
    res.json(assignment);
  });
});
app.use('/', router)
app.listen(port);
console.log('Got it up going high when they go low');
