//setup packages I need to use

var express = require('express');
var app = express();
var moment = require('moment');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Assignment = require('./models/assignment');
var dotenv = require('dotenv').config();
var port = process.env.PORT || 8081;
mongoose.connect(process.env.MONGODB_LINK);

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

var router = express.Router();
router.use(function(req, res, next) {
  console.log('Boot Up');
  next();
});

//This works
router.route('/')
.get(function(req, res) {
  const today = moment().utc().subtract(1, 'days').format();
  Assignment.find({dueDate: {$gt: today}}).sort({dueDate: 'ascending'}).exec(function (err, assignment){
    if(err)
    res.send(err);
    res.json(assignment);
  });
});


router.route('/assign')
.post( function(req, res){
  var assign = new Assignment();
  assign.title = req.body.title;
  assign.dueDate = moment(req.body.dueDate).format('L');
  assign.progress = req.body.progress;
  assign.complete = req.body.complete;
  assign.categories = req.body.categories;
  assign.part = req.body.part;
  assign.completionAmount = req.body.completionAmount;
  assign.goal = req.body.goal;
  assign.dailyGoal = req.body.dailyGoal;
  assign.save(function(err){
    if(err)
    res.send('derp this broke' + err);


  });
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

router.route('/assign/category/:categories')
.get(function(req, res) {
  Assignment.find({categories: req.params.categories}, function (err, assignment){
    if(err)
    res.send(err);
    res.json(assignment);
  });
});

router.route('/assign/update/:assign_id')
.put(function(req, res) {
  Assignment.findById(req.params.assign_id, function(err, assignment) {
    if(err)
    res.send(err);
    let keys = Object.keys(req.body);
    for(var i =0; i < keys.length; i++){
      let key = keys[i];
      assignment[key] = req.body[key];
    }
    assignment.save(function(err) {
      if(err)
      res.send(err);
      res.json(assignment);
    })
  });
});



app.use('/', router)
app.listen(port);
console.log('Got it up going high when they go low');
