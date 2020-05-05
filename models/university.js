const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const universitySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  campus: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  adress: {
    type: String,
    required: true
  },
  postal: {
    type: String,
    required: true,
  },
  scientists: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
  ]
});

module.exports = mongoose.model('University', universitySchema);
