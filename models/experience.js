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
    date: {
      type: Date,
      required: true,
    },
    motive: {
      type: String,
    }
  }],
  minParticipants: {
    type: Number,
    default: 1,
  },
  created_at:
  {
    type: Date,
    default: new Date()
  },
  updated_at:
  {
    type: Date,
    default: new Date()
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
  questionnaryLink: {
    type: String
  },
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
    required: true,
    default: false,
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
