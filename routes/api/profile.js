const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Profile
const Profile = require('../../models/Profile');
// Load users
const User = require('../../models/User');


// @route   GET /api/profile/test
// @description test the routes
// @access   PUBLIC
router.get('/test', (req, res) => res.json({msg: "I love bibi", data: {date: Date.now(), name: 'shhib'}}));


// @route   GET /api/profile
// @description get current user's profile
// @access   private  // Proectecd routs needs passport.authenticate with jwt strategy we created
router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  const error = {};

  Profile.findOne({ user: req.user.id}).then((profile) => {
    if(!profile) {
      errors.noprofile = 'There is no profile for user'
      return res.status(404).json(error);
    }
    res.json(profile);
  }).catch((error) => {res.status(error)});
})

module.exports = router;
