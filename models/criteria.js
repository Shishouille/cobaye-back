const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const criteriaSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    required: true,
    default: false,
  },
  isCreatedByUser: {
    type: Boolean,
    required: true,
    default: true,
  },
});

module.exports = mongoose.model('Criteria', criteriaSchema);
