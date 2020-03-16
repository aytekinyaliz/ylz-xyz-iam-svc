const { Router } = require('express');
const { authLevel, authMiddleware } = require('ylz-xyz-auth-mdw');

const userControllerInstance = require('./UserController');


const router = Router();

router.route('/signUp').post(
  authMiddleware(authLevel.public),
  userControllerInstance.signUp
);

router.route('/signIn').post(
  authMiddleware(authLevel.public),
  userControllerInstance.signIn
);

router.route('/users/query').get(
  authMiddleware(authLevel.private),
  userControllerInstance.query
);

module.exports = router;