import validator from 'express-validator';

import HttpError from '../config/HttpError.js';
import Experience from '../models/Experience.js';
import Criteria from '../models/Criteria.js';

const { validationResult } = validator;

export const list = async (req, res) => {
    const experiences = await Experience.find();
    res.json(experiences);
};

export const get = async (req, res) => {
  const { id } = req.params;
  const Experience = await Experience.findById(id)
  if (!Experience) {
    throw new HttpError(404, 'Could not find Experience.');
  }
  res.json(Experience);
};

// TODO: WIP !
// exports.filterExperience = async (req, res) => {
//   try {
//     // const user = await User.findById(req.userId);
//     const criterias = await Experience.populate('criterias').find();
//
//     res.status(200).json({
//       message: 'Fetched Experiences successfully.',
//       criterias,
//     });
//   } catch (err) {
//     if (!err.statusCode) {
//       err.statusCode = 500;
//     }
//   (err);
//   }
// };


export const create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError(422, 'Validation failed, entered data is incorrect.');
  }

  // Split criterias to find the new ones
  const { criterias } = req.body;
  const { newCriterias, generalCriterias } = criterias.reduce((acc, criteria) => {
    const key = criteria.category === 0 ? 'newCriterias' : 'generalCriterias';
    return {
      ...acc,
      [key]: acc[key].push(criteria),
    }
  }, {});

  // Add them to the database
  const fullCriterias = generalCriterias;
  if (newCriterias.length > 0) {
    const addedCriterias = await Promise.all(newCriterias.map((criteria) => Criteria.create(criteria)));
    fullCriterias.concat(addedCriterias);
  }

  await Experience.create({
    ...req.body,
    criterias: fullCriterias,
  })

  res.status(201).json(Experience);
};

// export const addParticipants = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     throw new Error(400, 'Incorrect data');
//   }
//   const expId = req.params.expId;
//   const userId = req.params.userId;
//
//   const experience = await Experience.findById(expId);
//   const user = await User.findById(userId);
//
//   const motive = req.body.motive;
//   const date = req.body.date;
//   try {
//     experience.participants.push({
//       motive,
//       date,
//       user: userId,
//     });
//     user.experiences.push({
//       date,
//       experience: expId,
//     })
//     res.status(201).json({
//       message: 'Participation OK',
//     });
//   } catch (err) {
//     if (!err.statusCode) {
//       err.statusCode = 500;
//     }
//   (err);
//   }
// };

// CRUD - U
export const update = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError(400, 'Validation failed, entered data is incorrect.');
  }

  const { params: { id }, userId } = req;

  let experience = await Experience.findById(id);
  if (!experience) {
    throw new HttpError(404, 'Could not find Experience.');
  }
  if (experience.author._id !== userId) {
    throw new HttpError(403, 'Not authorized!');
  }

  experience = {
    ...experience,
    ...req.body,
  }

  await experience.save();
  res.json(experience);
};

// CRUD - D
export const remove = async (req, res) => {
  const { params: { id }, userId } = req;

  const Experience = await Experience.findById(id);

  if (!Experience) {
    throw new HttpError(404, 'Could not find Experience.');
  }
  if (Experience.author !== userId) {
    throw new HttpError(403, 'Not authorized!');
  }

  await Experience.deleteOne({  _id: id });
  res.status(200);
};
