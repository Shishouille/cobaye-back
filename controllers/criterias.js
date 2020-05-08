// @todo not sure this is a good pattern, to discuss
const { validationResult } = require('express-validator');

const Criterias = require('../models/Criteria');
const Domain = require('../models/Domain');
const Role = require('../models/Role');
const NSC = require('../models/Nsc');
const Passation = require('../models/Passation');
const Profession = require('../models/Profession');
const University = require('../models/University');
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
    res.status(200).json(passationTypes);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getGeneralCriterias = async (req, res, next) => {
  const criterias = await Criterias.find({category: { $gte: 1} });
  try {
    if (!criterias) {
      const error = new Error('Could not find Criterias.');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json(criterias);
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
  const minAge = req.body.minAge;
  const maxAge = req.body.maxAge;
  const criteria = new Criterias({
    name,
    category,
    minAge,
    maxAge,
  });
  try {
    await criteria.save();
    res.status(201).json({
      message: 'Criterias created successfully!',
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
      message: 'Criterias created successfully!',
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
      message: 'Criterias created successfully!',
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
      message: 'Criterias created successfully!',
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
      message: 'Criterias created successfully!',
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
      message: 'Criterias created successfully!',
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
      message: 'Criterias created successfully!',
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
      message: 'Criterias created successfully!',
      profession,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

