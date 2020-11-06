const express = require('express');

const router = express.Router();

// @route GET api/users
// @desc  Test route
// Public
router.route('/').get((req, res) => res.send('User Route'));

// @route GET api/users
// @desc  Test route
// Public

module.exports = router;
