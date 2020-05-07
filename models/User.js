import mongoose from 'mongoose';

const { Schema, model, Types } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  birthday: {
    type: Date,
    required: true
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female', 'Trans'],
  },
  nsc: {
    _id: {
      type: Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true
    },
    level: {
      type: Number,
      required: true
    }
  },
  profession: {
    _id: {
      type: Types.ObjectId,
      required: true,
    },
    label: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
  },
  domain: {
    _id: {
      type: Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true
    },
  },
  university: {
    _id: {
      type: Types.ObjectId,
      required: true,
    },
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
  },
  role: {
    _id: {
      type: Types.ObjectId,
      required: true,
    },
    label: {
      type: String,
      required: true
    },
    status: Number,
  },
});

export default model('User', userSchema);
