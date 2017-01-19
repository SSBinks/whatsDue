var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Assignment = require('./assignment');



var AssignmentTypeSchema = new Schema({
  _id: Number,
  categories: String,
  fieldOne: {
    name: {type: String},
    length: {type: Number}
  },
  fieldTwo: {
    name: {type: String},
    length: {type: Number}
  },
  fieldThree: {
    name: {type: String},
    length: {type: Number}
  },
  assignment: [{type: Schema.Types.ObjectId, ref: 'Assignment'}]
});

module.exports = mongoose.model('AssignmentType', AssignmentTypeSchema);
