import validator from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/User.js';
import HttpError from '../config/HttpError.js';

const { validationResult } = validator;

export const list = async (req, res) => {
  const user = await User.find();
  res.json(user);
};


export const signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError(400, 'Validation failed');
  }

    const hashedPw = await bcrypt.hash(password, 12);
    await User.create({
      ...req.body,
      password: hashedPw,
    });

    // @todo WTF ???
    // if (result.role._id === '5eaffbbdc47d4e6edf0467d4') {
    //   const university = await University.findById(result.university);
    //   university.scientists.push(result);
    //   await university.save();
    // }

    res.status(201);
};

export const signin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });
  if (!user) {
    throw new HttpError(404, 'A user with this email could not be found.');
  }

  const isEqual = await bcrypt.compare(password, user.password);
  if (!isEqual) {
    throw new HttpError(400, 'Wrong password!');
  }
  const token = jwt.sign(
    { email: user.email, userId: user._id },
    'somesupersecretsecret', // @todo set in config
    { expiresIn: '10h' } // @todo set in config
  );
  res.json(token);
};

// TODO: A voir si utile
// exports.getUserRole = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.userId);
//     if (!user) {
//       const error = new HttpError('User not found.');
//       error.statusCode = 404;
//       throw error;
//     }
//     const role = await Role.findById(user.role);
//     if (!role) {
//       const error = new HttpError('Role not found.');
//       error.statusCode = 404;
//       throw error;
//     }
//     res.status(200).json({ role: role.name });
//   } catch (err) {
//     if (!err.statusCode) {
//       err.statusCode = 500;
//     }
//     next(err);
//   }
// };

export const get = async (req, res) => {
    const user = await User.findById(req.body.userId);
    if (!user) {
      throw new HttpError(404, 'User not found.');
    }
    res.json(user);
};
