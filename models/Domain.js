import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const domainSchema = new Schema({
  name: {
    type: String,
    required: true
  },
}, { timestamps: true });

export default model('Domain', domainSchema);
