const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const experienceSchema = new Schema({
  name: {
    type: String,
    required: true
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
    motive: {
      type: String,
    }
  }],
  description: {
    type: String,
    required: true
  },
  tags: {
    type: Array,
  },
  criterias: [{
    type: Schema.Types.ObjectId,
    ref: 'Criteria'
  }],
  passation: {
    type: Schema.Types.ObjectId,
    ref: 'Passation'
  },
  questionnaryLink: {
    type: String
  },
  time: {
    type: Number,
    required: true
  },
  steps: {
    type: Number,
    required: true
  },
  fromDate: {
    type: Date,
    required: true
  },
  toDate: {
    type: Date,
  }
});

module.exports = mongoose.model('Experience', experienceSchema);
