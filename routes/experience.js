const express = require('express');
const { body } = require('express-validator/check');

const experienceController = require('../controllers/experience');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// GET
router.get('/experiences', isAuth, experienceController.getExperiences);

router.get('/experience/:expId', isAuth, experienceController.getExperience);

router.get('/experience/filter/:userId', isAuth, experienceController.filterExperience);

router.get('/passations', isAuth, experienceController.getPassations);

// POST
router.post(
  '/experience',
  isAuth,
  [
    body('name')
      .trim()
      .isLength({ min: 5 }),
    body('creator')
      .trim()
      .isLength({ min: 5 }),
    body('description')
      .trim()
      .isLength({ min: 5 }),
    body('tags')
      .trim(),
    body('criterias')
      .trim()
      .isLength({ min: 5 }),
    body('passation')
      .trim()
      .isLength({ min: 5 }),
      body('questionnaryLink')
      .trim()
      .isLength({ min: 5 }),
    body('time')
      .trim()
      .isLength({ min: 5 }),
    body('steps')
      .trim()
      .isLength({ min: 5 }),
    body('fromDate')
      .trim()
      .isLength({ min: 5 }),
    body('toDate')
      .trim()
      .isLength({ min: 5 })
  ],
  experienceController.createExperience
);

router.post(
  '/experience/:expId/participate',
  isAuth,
  [
    body('participants')
      .trim(),
  ],
  experienceController.addParticipants
);

router.put(
  '/experience/:expId',
  isAuth,
  [
    body('name')
      .trim()
      .isLength({ min: 5 }),
    body('creator')
      .trim()
      .isLength({ min: 5 }),
    body('description')
      .trim()
      .isLength({ min: 5 }),
    body('tags')
      .trim(),
    body('criterias')
      .trim()
      .isLength({ min: 5 }),
    body('passation')
      .trim()
      .isLength({ min: 5 }),
      body('questionnaryLink')
      .trim()
      .isLength({ min: 5 }),
    body('time')
      .trim()
      .isLength({ min: 5 }),
    body('steps')
      .trim()
      .isLength({ min: 5 }),
    body('fromDate')
      .trim()
      .isLength({ min: 5 }),
    body('toDate')
      .trim()
      .isLength({ min: 5 })
  ],
  experienceController.updatePost
);

router.delete('/experience/:expId', isAuth, experienceController.deleteExperience);

router.get(
  '/criterias',
  isAuth,
  experienceController.getCriterias
);

router.get(
  '/criterias',
  isAuth,
  experienceController.getGeneralCriterias
);

module.exports = router;