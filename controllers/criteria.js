const { validationResult } = require('express-validator');

const Criteria = require('../models/criteria');
const Domain = require('../models/domain');
const Role = require('../models/role');
const NSC = require('../models/nsc');
const Passation = require('../models/passation');
const Profession = require('../models/profession');
const University = require('../models/university');
const Gender = require('../models/gender');

// CRUD - R

exports.getAllSignup = async (req, res, next) => {
  const domains = await Domain.find().select('name');
  const nscs = await NSC.find().sort('level');
  const roles = await Role.find();
  const professions = await Profession.find().sort('name');
  const genders = await Gender.find();
  const universities = await University.find().select('name');
  try {
    if (!domains || !nscs || !roles || !professions || !genders || !universities) {
      const error = new Error('Could not find all the infos.');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json(
    { 
      domains,
      nscs,
      roles,
      professions,
      genders,
      universities
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};


exports.getPassationTypes = async (req, res, next) => {
  const passationTypes = await Passation.find()
  try {
    if (!passationTypes) {
      const error = new Error('Could not find Passations.');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ passationTypes });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getGeneralCriterias = async (req, res, next) => {
  const criterias = await Criteria.find({category: { $gte: 1} });
  try {
    if (!criterias) {
      const error = new Error('Could not find Criterias.');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ criterias });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};


// CRUD - C 

exports.createCriteria = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }

  const name = req.body.name;
  const category = req.body.category;
  const criteria = new Criteria({
    name,
    category,
  });
  try {
    await criteria.save();
    res.status(201).json({
      message: 'Criteria created successfully!',
      criteria,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// TODO: FILE IMPORT
exports.createDomain = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }

  const name = req.body.name;
  const icon = false;
  const domain = new Domain({
    name,
    icon,
  });
  try {
    await domain.save();
    res.status(201).json({
      message: 'Criteria created successfully!',
      criteria,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.createNSC = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }

  const name = req.body.name;
  const level = req.body.level;
  const nsc = new NSC({
    name,
    level,
  });
  try {
    await nsc.save();
    res.status(201).json({
      message: 'Criteria created successfully!',
      nsc,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};


exports.createPassation = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }

  const name = req.body.name;
  const passation = new Passation({
    name,
  });
  try {
    await passation.save();
    res.status(201).json({
      message: 'Criteria created successfully!',
      passation,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.createRole = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }

  const name = req.body.name;
  const role = new Role({
    name,
  });
  try {
    await role.populate('test').save();
    res.status(201).json({
      message: 'Criteria created successfully!',
      role,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.createGender = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }

  const name = req.body.name;
  const gender = new Gender({
    name,
  });
  try {
    await gender.save();
    res.status(201).json({
      message: 'Criteria created successfully!',
      gender,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.createUniversity = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }

  const name = req.body.name;
  const city = req.body.city;
  const campus = req.body.campus;
  const adress = req.body.adress;
  const postal = req.body.postal;

  const university = new University({
    name,
    campus,
    city,
    adress,
    postal,
  });
  try {
    await university.save();
    res.status(201).json({
      message: 'Criteria created successfully!',
      university,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.createProfession = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }

  const name = req.body.name;
  const category = req.body.category;

  const profession = new Profession({
    name,
    category,
  });
  try {
    await profession.save();
    res.status(201).json({
      message: 'Criteria created successfully!',
      profession,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

