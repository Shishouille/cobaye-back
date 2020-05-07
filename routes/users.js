import express from 'express';
import validator from 'express-validator';

import User from '../models/User.js';
import { get, signup, signin } from '../controllers/users.js';
import isAuth from'../middlewares/is-auth.js';

const { body } = validator;
const router = express.Router();

router.get('/:id', isAuth, get);
router.post(
  '/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value) => {
        return User.findOne({ email: value }).then(userDoc => {
          if (userDoc) {
            return Promise.reject('E-Mail address already exists!');
          }
        });
      })
      .normalizeEmail(),
    body('password')
      .trim()
      .isLength({ min: 6 }),
    body('firstName')
      .trim()
      .not()
      .isEmpty(),
    body('lastName')
      .trim()
      .not()
      .isEmpty(),
    body('birthday')
      .not()
      .isEmpty()
  ],
  signup
);

router.post('/signin', signin);

export default router;
