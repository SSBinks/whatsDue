var mongoose = require('mongoose');
var moment = require('moment');
var Schema = mongoose.Schema;
var AssignmentType = require('./assignmenttype');
var AssignmentSchema = new Schema ({
  _assign: {type: Number, ref: 'AssignmentType'},
  title: String,
  course: Array,
  dueDate: {type: Date,  min: moment().subtract(1, 'day'), max: moment().add(2, 'years').calendar()},
  progress: {type: Number, min: 0, max: 100},
  complete: Boolean,
  category: String
});

module.exports = mongoose.model('Assignment', AssignmentSchema);
