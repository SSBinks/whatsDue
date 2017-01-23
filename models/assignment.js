var mongoose = require('mongoose');
var moment = require('moment');
var Schema = mongoose.Schema;
var AssignmentType = require('./assignmenttype');
var AssignmentSchema = new Schema ({
  title: String,
  dueDate: {type: Date,  min: moment().subtract(1, 'day'), max: moment().add(2, 'years').calendar()},
  progress: {type: Number, min: 0, max: 100},
  complete: Boolean,
  categories: String,
  part: String,
  completionAmount: Number,
  goal: Number,
  dailyGoal: Number
});

module.exports = mongoose.model('Assignment', AssignmentSchema);
