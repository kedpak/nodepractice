const express = require('express');
const router = express.Router();

// @route   GET /api/profile/test
// @description test the routes
// @access   PUBLIC
router.get('/test', (req, res) => res.json({msg: "Hellow universe"}));

module.exports = router;
