const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dateSchema = new Schema({
  date: {
    type: Date,
    required: true
  },
  hour: {
    type: String,
    required: true
  },
  experience: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Experience'
    }
  ],
  user: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
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
});

module.exports = mongoose.model('Date', dateSchema);
