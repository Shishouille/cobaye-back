const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const domainSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('Domain', domainSchema);
