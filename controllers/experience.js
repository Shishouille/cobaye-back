const fs = require('fs');
const path = require('path');

const { validationResult } = require('express-validator/check');

const Experience = require('../models/Experience');
const User = require('../models/user');

exports.getExperiences = async (req, res, next) => {
  try {
    const Experiences = await Experience.find();
    res.status(200).json({
      message: 'Fetched Experiences successfully.',
      Experiences: Experiences,
      totalItems: totalItems
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

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
    await Experience.save();
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

exports.getExperience = async (req, res, next) => {
  const ExperienceId = req.params.ExperienceId;
  const Experience = await Experience.findById(ExperienceId);
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

exports.updateExperience = async (req, res, next) => {
  const ExperienceId = req.params.ExperienceId;
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
    
    Experience.name = name;
    Experience.creator = req.userId;
    Experience.description = description;
    Experience.tags = tags;
    Experience.criterias = criterias;
    Experience.passation = passation;
    Experience.questionnaryLink = questionnaryLink;
    Experience.time = time;
    Experience.steps = steps;
    Experience.fromDate = fromDate;
    Experience.toDate = toDate;
    const result = await Experience.save();
    res.status(200).json({ message: 'Experience updated!', Experience: result });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteExperience = async (req, res, next) => {
  const ExperienceId = req.params.ExperienceId;
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

const clearImage = filePath => {
  filePath = path.join(__dirname, '..', filePath);
  fs.unlink(filePath, err => console.log(err));
};
