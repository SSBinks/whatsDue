//setup packages I need to use

var express = require('express');
var app = express();
var moment = require('moment');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Assignment = require('./models/assignment');
var AssignmentType = require('./models/assignmenttype');
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
  var type = AssignmentType.find({category: 'reading'}, function(err, type){
    if(err)return handleError(err);
    console.log(type.category);
  });
  // res.send(err);
  var assign = new Assignment();
  // console.log('>>>>This is type object' + JSON.stringify(type))
  assign.title = req.body.title;
  assign.dueDate = moment(req.body.dueDate).format('L');
  assign.progress = req.body.progress;
  assign.complete = req.body.complete;
  console.log('>>>>This is TYPE ' +  req.body.category)
  assign._assign = type.id;

  assign.save(function(err){
    if(err)
    res.send('derp this broke' + err);
    // console.log('>>>>This is type object ' + JSON.stringify(type))
  });
type.assignment.push(assign.id);
type.save();
res.json({ message: "Come on ladies let us get into formation"});
});


router.route('/assign/:due_date')
.get(function(req, res) {
  Assignment.find({dueDate: moment(req.params.due_date).format('L')}, function (err, assignment){
    if(err)
    res.send(err);
    res.json(assignment);
  });
});

router.route('/assign/category/:category')
.get(function(req, res) {
AssignmentType.find({category: req.params.category}, function(err, type){
  if(err)
  res.send(err);
  res.json(type);
  });
})
router.route('/assign/category')
.post( function(req, res){
  var type = new AssignmentType();
  console.log('>>>>This is type object ' + JSON.stringify(type))
  type.category = req.body.category;
  type.fieldOne.name = req.body.fname;
  type.fieldOne.length = req.body.fnum;
  type.fieldTwo.name = req.body.sname;
  type.fieldTwo.length = req.body.snum;
  type.fieldThree.name = req.body.tname;
  type.fieldThree.length = req.body.tnum;
  console.log('This is the body ' + JSON.stringify(req.body));
  type.save(function(err){
    if(err)
    res.send('Yall dont want zero problems' + err);
    // res.json({ message: "It worked?"});
  });
});
app.use('/', router)
app.listen(port);
console.log('Got it up going high when they go low');
