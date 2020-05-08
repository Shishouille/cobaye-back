import mongoose from 'mongoose';

const { Schema, model, Types } = mongoose;

const experienceSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  author: {
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  },
  participants: [{
    user: {
      type: Types.ObjectId,
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
  description: String,
  tags: Array,
  criterias: [{
    type: Types.ObjectId,
    ref: 'Criteria'
  }],
  passation: {
    _id: Types.ObjectId,
    name: String,
  },
  questionnaryLink: {
    type: String
  },
  duration: {
    type: Number,
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
  end: Date,
}, { timestamps: true });

export default model('Experience', experienceSchema);
