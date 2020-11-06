const express = require('express');

const router = express.Router();

// @route GET api/posts
// @desc  Test route
// Public
router.route('/').get((req, res) => res.send('Posts Route'));

module.exports = router;
