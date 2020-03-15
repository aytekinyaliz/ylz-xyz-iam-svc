const { Router } = require('express');

const userControllerInstance = require('./UserController');


const router = Router();

router.route('/signUp').post(
  // auth,
  userControllerInstance.signUp
);

router.route('/signIn').post(
  // auth,
  userControllerInstance.signIn
);

module.exports = router;