const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  birthday: {
    type: Date,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  nsc: {
    type: Schema.Types.ObjectId,
    ref: 'NSC'
  },
  profession: {
    type: Schema.Types.ObjectId,
    ref: 'Profession'
  },
  domain: {
    type: Schema.Types.ObjectId,
    ref: 'Domain'
  },
  university: {
    type: Schema.Types.ObjectId,
    ref: 'University'
  },
  role:
    {
      type: Schema.Types.ObjectId,
      ref: 'Role'
    },
  created_at:
    {
      type: Date,
      default: new Date(),
      required: true,
    },
  updated_at:
    {
      type: Date,
    },
  experiences: [
      {
      type: Schema.Types.ObjectId,
      ref: 'Experience'
    }
  ],
});

module.exports = mongoose.model('User', userSchema);
