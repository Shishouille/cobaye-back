import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const criteriaSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  minAge: Number,
  maxAge: Number,
  category: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

export default model('Criteria', criteriaSchema);
