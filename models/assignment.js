var mongoose = require('mongoose');
var moment = require('moment');
var Schema = mongoose.Schema;

var AssignmentSchema = new Schema ({
  title: String,
  course: Array,
  dueDate: {type: Date,  min: moment(), max: moment().add(2, 'years').calendar()},
  progress: {type: Number, min: 0, max: 100},
  complete: Boolean,
});

module.exports = mongoose.model('Assignment', AssignmentSchema);
