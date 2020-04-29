const express = require('express');
const { body } = require('express-validator/check');

const critController = require('../controllers/criteria');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get(
  '/criterias',
  isAuth,
  [
    body('name')
    .trim()
    .isLength({ min: 5 }),
    body('status')
      .trim()
      .not()
      .isEmpty()
  ],
  critController.getCriterias
);

router.post(
  '/criterias',
  isAuth,
  [
    body('name')
    .trim()
    .isLength({ min: 5 }),
    body('status')
      .trim()
      .not()
      .isEmpty()
  ],
  critController.createCriteria
);


module.exports = router;
