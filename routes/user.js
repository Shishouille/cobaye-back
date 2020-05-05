const express = require('express');
const { body } = require('express-validator');

const User = require('../models/user');
const authController = require('../controllers/user');
const isAuth = require('../middlewares/is-auth');

const router = express.Router();

// GET
router.get('/:userId', isAuth, authController.getUser);

// router.get('/status', isAuth, authController.getUserRole);

// router.get(
//   '/dates',
//   isAuth,
//   authController.getDates
// );

// PUT
router.put(
  '/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value, { req }) => {
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
  authController.signup
);

// POST 
router.post('/signin', authController.signin);

module.exports = router;
