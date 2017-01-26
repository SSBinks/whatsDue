var mongoose = require('mongoose');
var moment = require('moment');
var Schema = mongoose.Schema;
var AssignmentSchema = new Schema ({
  title: String,
  dueDate: {type: Date, max: moment().add(2, 'years').calendar()},
  progress: {type: Number, min: 0, max: 100},
  complete: Boolean,
  categories: String,
  part: String,
  completionAmount: Number,
  goal: Number,
  dailyGoal: Number
});

module.exports = mongoose.model('Assignment', AssignmentSchema);
