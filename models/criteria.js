const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const criteriaSchema = new Schema({
  name: {
    type: String,
  },
  isCreatedByUser: {
    type: Boolean,
    default: true,
  },
  created_at:
  {
    type: Date,
    default: new Date()
  },
  updated_at:
  {
    type: Date,
  },
});

module.exports = mongoose.model('Criteria', criteriaSchema);
