import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const roleSchema = new Schema({
  label: {
    type: String,
    required: true
  },
  // @todo what is status ? Why number ?
  status: {
    type: Number,
    default: 0,
  },
});

export default model('Role', roleSchema);
