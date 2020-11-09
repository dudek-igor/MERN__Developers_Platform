const express = require('express');
// Methods
const {
  authorizationUser,
  loginUser,
  createUser,
} = require('../../controllers/auth');
// Middleware
// Authorization Middleware
const {
  authorizationViaToken,
  checkUserRole,
} = require('../../middleware/auth');
// Validate Middleware
const {
  registerValidationRules,
  loginValidationRules,
  validate,
} = require('../../utils/validator');

//Mount Routes
const router = express.Router();

router
  .route('/')
  .get(
    authorizationViaToken,
    checkUserRole('admin', 'user'),
    authorizationUser
  );
router.route('/login').post(loginValidationRules, validate, loginUser);
router.route('/register').post(registerValidationRules, validate, createUser);

module.exports = router;
