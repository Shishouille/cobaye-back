import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const professionSchema = new Schema({
  label: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
});

export default model('Profession', professionSchema);
