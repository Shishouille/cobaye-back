const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  ville: {
    type: String,
    required: true
  },
  adress: {
    type: String,
    required: true
  },
  postal: {
    type: String,
    default: 'I am new!'
  },
  scientist: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
  ]
});

module.exports = mongoose.model('User', userSchema);
