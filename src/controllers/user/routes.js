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

router.route('/signOut').post(
  authMiddleware(authLevel.private),
  userControllerInstance.signOut
);

router.route('/query').get(
  authMiddleware(authLevel.private),
  userControllerInstance.query
);

router.route('/').get(
  authMiddleware(authLevel.private),
  userControllerInstance.getAll
);

module.exports = router;