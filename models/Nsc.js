import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const NSCSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  level: {
    type: Number,
    required: true
  }
}, { timestamps: true });

export default model('NSC', NSCSchema);
