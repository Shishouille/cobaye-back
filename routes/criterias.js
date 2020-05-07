const express = require('express');
const { body } = require('express-validator');

const critController = require('../controllers/criterias');

const router = express.Router();

router.get('/', critController.getGeneralCriterias);
router.get('/signup', critController.getAllSignup);
router.get('/passations', critController.getPassationTypes);

router.post('/criteria',
  [body('name').trim()],
  critController.createCriteria,
);

router.post('/domain',
  [body('name').trim()],
  critController.createDomain
);

router.post('/nsc',
  [
    body('name').trim(),
    body('level').isInt(),
  ],
  critController.createNSC
);


router.post('/passation',
  [body('name').trim()],
  critController.createPassation
);

router.post('/role',
  [body('name').trim()],
  critController.createRole
);

router.post('/profession',
  [
    body('name').trim(),
    body('category').isInt(),
  ],
  critController.createProfession
);

router.post('/gender',
  [body('name').trim()],
  critController.createGender
);

router.post('/university',
  [
    body('name').trim(),
    body('campus').trim(),
    body('city').trim(),
    body('adress').trim(),
    body('postal').isInt({max: 5})
  ],
  critController.createUniversity
);

module.exports = router;
