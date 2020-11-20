const { check, validationResult } = require('express-validator');

exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};

exports.registerValidationRules = [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please enter a valid email').isEmail(),
  check(
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({ min: 6 }),
];

exports.loginValidationRules = [
  check('email', 'Please enter a valid email').isEmail(),
  check('password', 'Password is required').exists(),
];

exports.profileValidationRules = [
  check('status', 'Status is reguired').not().isEmpty(),
  check('skills', 'Skills is reguired').not().isEmpty(),
];
exports.experienceValidationRules = [
  check('title', 'Title is reguired').not().isEmpty(),
  check('company', 'Company is reguired').not().isEmpty(),
  check('from', 'From date is reguired').not().isEmpty(),
];
exports.educationValidationRules = [
  check('school', 'School is reguired').not().isEmpty(),
  check('degree', 'Degree is reguired').not().isEmpty(),
  check('from', 'From date is reguired').not().isEmpty(),
  check('fieldofstudy', 'Field of study is reguired').not().isEmpty(),
];
exports.postsValidationRules = [
  check('text', 'Text is reguired').not().isEmpty(),
];
exports.commentsValidationRules = [
  check('text', 'Text is reguired').not().isEmpty(),
];
