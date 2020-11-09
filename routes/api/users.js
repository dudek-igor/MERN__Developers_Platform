const express = require('express');

// Mount router
const router = express.Router();

router.route('/').get((req, res) => res.send('User Works'));

module.exports = router;
