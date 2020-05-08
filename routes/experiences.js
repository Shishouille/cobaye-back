import express from 'express';
import validator from 'express-validator';

import { list, get, create, update, remove } from '../controllers/experiences.js';
import isAuth from '../middlewares/is-auth.js';

const { body } = validator;
const router = express.Router();

router.get('/', isAuth, list);
router.get('/:id', isAuth, get);
// router.get('/filter', experienceController.filterExperience);

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
  create
);

// router.post(
//   '/:userId/:expId/participate',
//   isAuth,
//   [
//     body('participants')
//       .trim(),
//   ],
//   experienceController.addParticipants
// );

router.patch(
  '/:id',
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
  update
);

router.delete('/:id', isAuth, remove);

export default router;
