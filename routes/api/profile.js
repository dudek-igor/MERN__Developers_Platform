const express = require('express');
const {
  getUserProfile,
  createUserProfile,
  getProfiles,
  getProfile,
  deleteProfile,
  updateExpiernce,
  deleteExpiernce,
  updateEducation,
  deleteEducation,
  getGithubRepo,
} = require('../../controllers/profile');

// Middleware
// Authorization Middleware
const {
  authorizationViaToken,
  // checkUserRole,
} = require('../../middleware/auth');
// Validator Middleware
const {
  profileValidationRules,
  experienceValidationRules,
  educationValidationRules,
  validate,
} = require('../../utils/validator');

const router = express.Router();

router.route('/me').get(authorizationViaToken, getUserProfile);

router
  .route('/')
  .get(getProfiles)
  .post(
    authorizationViaToken,
    profileValidationRules,
    validate,
    createUserProfile
  )
  .delete(authorizationViaToken, deleteProfile);

router.route('/user/:user_id').get(getProfile);

// User's Experience
router
  .route('/experience')
  .put(
    authorizationViaToken,
    experienceValidationRules,
    validate,
    updateExpiernce
  );
router
  .route('/experience/:exp_id')
  .delete(authorizationViaToken, deleteExpiernce);

// User's Education
router
  .route('/education')
  .put(
    authorizationViaToken,
    educationValidationRules,
    validate,
    updateEducation
  );
router
  .route('/education/:edu_id')
  .delete(authorizationViaToken, deleteEducation);
//Github
router.route('/github/:username').get(getGithubRepo);

module.exports = router;
