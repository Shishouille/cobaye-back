const { validationResult } = require('express-validator');

const Experience = require('../models/experience');
const User = require('../models/user');
const Criteria = require('../models/criteria');

// CRUD - R

exports.getExperiences = async (req, res, next) => {
  try {
    const experiences = await Experience.find();
    res.status(200).json({
      message: 'Fetched Experiences successfully.',
      experiences,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};


exports.getExperience = async (req, res, next) => {
  const ExperienceId = req.params.expId;
  const Experience = await Experience.findById(ExperienceId)
  try {
    if (!Experience) {
      const error = new Error('Could not find Experience.');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ message: 'Experience fetched.', Experience: Experience });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// TODO: WIP !
exports.filterExperiences = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    const Experiences = await Experience.find().populate('criteria');
    res.status(200).json({
      message: 'Fetched Experiences successfully.',
      Experiences: Experiences,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// CRUD - C

exports.createExperience = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }

  const name = req.body.name;
  const description = req.body.description;
  const tags = req.body.tags;
  const criterias = req.body.criterias;
  const passation = req.body.passation;
  const questionnaryLink = req.body.questionnaryLink;
  const time = req.body.time;
  const steps = req.body.steps;
  const fromDate = req.body.fromDate;
  const toDate = req.body.toDate;
  const Experience = new Experience({
    name,
    creator: req.userId,
    description,
    tags,
    criterias,
    passation,
    questionnaryLink,
    time,
    steps,
    fromDate,
    toDate,
  });
  try {
    await experience.save();
    const user = await User.findById(req.userId);
    user.experiences.push(Experience);
    await user.save();
    res.status(201).json({
      message: 'Experience created successfully!',
      Experience: Experience,
      creator: { _id: user._id, name: user.name }
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// CRUD - U
exports.updateExperience = async (req, res, next) => {
  const expId = req.params.expId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }
  const name = req.body.name;
  const description = req.body.description;
  const tags = req.body.tags;
  const criterias = req.body.criterias;
  const passation = req.body.passation;
  const questionnaryLink = req.body.questionnaryLink;
  const time = req.body.time;
  const steps = req.body.steps;
  const fromDate = req.body.fromDate;
  const toDate = req.body.toDate;
  try {
    const experience = await Experience.findById(expId);
    if (!experience) {
      const error = new Error('Could not find Experience.');
      error.statusCode = 404;
      throw error;
    }
    if (experience.creator.toString() !== req.userId) {
      const error = new Error('Not authorized!');
      error.statusCode = 403;
      throw error;
    }
    
    experience.name = name;
    experience.creator = req.userId;
    experience.description = description;
    experience.tags = tags;
    experience.criterias = criterias;
    experience.passation = passation;
    experience.questionnaryLink = questionnaryLink;
    experience.time = time;
    experience.steps = steps;
    experience.fromDate = fromDate;
    experience.toDate = toDate;
    const result = await experience.save();
    res.status(200).json({ message: 'Experience updated!', experience: result });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// CRUD - D
exports.deleteExperience = async (req, res, next) => {
  const ExperienceId = req.params.expId;
  try {
    const Experience = await Experience.findById(ExperienceId);

    if (!Experience) {
      const error = new Error('Could not find Experience.');
      error.statusCode = 404;
      throw error;
    }
    if (Experience.creator.toString() !== req.userId) {
      const error = new Error('Not authorized!');
      error.statusCode = 403;
      throw error;
    }
    // Check logged in user
    clearImage(Experience.imageUrl);
    await Experience.findByIdAndRemove(ExperienceId);

    const user = await User.findById(req.userId);
    user.Experiences.pull(ExperienceId);
    await user.save();

    res.status(200).json({ message: 'Deleted Experience.' });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};