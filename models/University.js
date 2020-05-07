import mongoose from 'mongoose';

const { Schema, model } = mongoose;

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
  address: {
    type: String,
    required: true
  },
  zipCode: {
    type: String,
    required: true,
  },
});

export default model('University', universitySchema);
