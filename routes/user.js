const express = require('express');
const { body } = require('express-validator/check');

const User = require('../models/user');
const authController = require('../controllers/authentification');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

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
      .isLength({ min: 5 }),
    body('name')
      .trim()
      .not()
      .isEmpty()
  ],
  authController.signup
);

router.get(
  '/nsc',
  authController.getNSC
);

router.get(
  '/roles',
  authController.getRoles
);

router.get(
  '/universities',
  authController.getUniversities
);

router.get(
  '/profession',
  authController.getProfessions
);

router.post('/login', authController.login);

router.get('/status', isAuth, authController.getUserRole);

router.get(
  '/dates',
  isAuth,
  authController.getDates
);



module.exports = router;
