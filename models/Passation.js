import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const passationSchema = new Schema({
  label: {
    type: String,
    required: true
  },
});

export default model('Passation', passationSchema);
