const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const experienceSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  participants: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'      
    },
    date: {
      type: Date,
      required: true,
    },
    motive: String,
  }],
  minParticipants: {
    type: Number,
    default: 1,
  },
  description: {
    type: String,
    required: true
  },
  tags: {
    type: Array,
  },
  criterias: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Criteria'
    }
  ],
  passation: {
    type: Schema.Types.ObjectId,
    ref: 'Passation'
  },
  questionnaryLink: String,
  time: {
    type: String,
    required: true
  },
  steps: {
    type: Number,
    required: true
  },
  remuneration: {
    type: Boolean,
    default: false,
  },
  start: {
    type: Date,
    required: true
  },
  end: {
    type: Date,
  },  
}, { timestamps: true }),;

module.exports = mongoose.model('Experience', experienceSchema);
