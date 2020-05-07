const express = require('express');
const { body } = require('express-validator');

const experienceController = require('../controllers/experience');
const isAuth = require('../middlewares/is-auth');

const router = express.Router();

// GET
router.get('/', isAuth, experienceController.getExperiences);

router.get('/:expId', isAuth, experienceController.getExperience);

// router.get('/filter/:userId', isAuth, experienceController.filterExperience);
router.get('/filter', experienceController.filterExperience);

// POST
router.post(
  '/',
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
      .isURL(),
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
  '/:userId/:expId/participate',
  isAuth,
  [
    body('participants')
      .trim(),
  ],
  experienceController.addParticipants
);

// PUT

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
  experienceController.updateExperience
);

// DELETE

router.delete('/:expId', isAuth, experienceController.deleteExperience);

module.exports = router;