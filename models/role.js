const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roleSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  status: {
    type: Number,
    required: true,
    default: 0,
  },
});

module.exports = mongoose.model('Role', roleSchema);
