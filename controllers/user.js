const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const Role = require('../models/role');

const NSC = require('../models/nsc');
const Profession = require('../models/profession');
const Domain = require('../models/domain');
const University = require('../models/university');

exports.getInfos = async (req, res, next) => {
  try {
    const NSC = await NSC.find();
    const Profession = await Profession.find();
    const Domain = await Domain.find();
    const University = await University.find();
    const Role = await Role.find();
    res.status(200).json({
      message: 'Fetched Infos successfully.',
      NSC,
      Profession,
      Domain,
      University,
      Role,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};


exports.signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.');
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const {
    firstName,
    lastName,
    email,
    password,
    birthday,
    gender,
    nsc,
    profession,
    domain,
    university,
    role,
  } = req.body;
  try {
    const hashedPw = await bcrypt.hash(password, 12);
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPw,
      birthday,
      gender,
      nsc,
      profession,
      domain,
      university,
      role,
    });
    const result = await user.save();
    if (result.role._id === '5eaffbbdc47d4e6edf0467d4') {
      const university = await University.findById(result.university);
      university.scientists.push(result);
      await university.save();      
    }
    res.status(201).json({ message: 'User created!', userId: result._id });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.signin = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      const error = new Error('A user with this email could not be found.');
      error.statusCode = 401;
      throw error;
    }
    loadedUser = user;
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error('Wrong password!');
      error.statusCode = 401;
      throw error;
    }
    const token = jwt.sign(
      {
        email: loadedUser.email,
        userId: loadedUser._id.toString()
      },
      'somesupersecretsecret',
      { expiresIn: '10h' }
    );
    res.status(200).json({ token: token, userId: loadedUser._id.toString() });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// TODO: A voir si utile
exports.getUserRole = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      const error = new Error('User not found.');
      error.statusCode = 404;
      throw error;
    }
    const role = await Role.findById(user.role);
    if (!role) {
      const error = new Error('Role not found.');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ role: role.name });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    const role = await Role.findById(user.role);
    if (!user) {
      const error = new Error('User not found.');
      error.statusCode = 404;
      throw error;
    }
    if (!role) {
      const error = new Error('Role not found.');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ user: {...user, role } });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
