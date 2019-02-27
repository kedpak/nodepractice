// Authentication
const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pwKey = require('../../config/keys');
const passport = require('passport');


//Load Input Register validation
const validateRegisterInput = require('../../validation/register');

// Load Login validation
const validateLoginInput = require('../../validation/login');


// @route   GET /api/profile/test
// @description test the routes
// @access   PRIVATE
router.get('/test', (req, res) => res.json({msg: new User({name: 'kevin'})}));


// @route POST /api/profile/register
// @description  Create a new users
// @access PUBLIC
router.post('/register', (req, res) => {

  const { errors, isValid } = validateRegisterInput(req.body); // Validates the body object of name, email, etc.

  if (!isValid) { // Check validation
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email}).then((user) => {
    if(user) {
      errors.email = 'Email already registered!';
      return res.status(400).json({msg: errors});
    } else {
      const avatar = gravatar.url(req.body.email, {s: '200', r: 'pg', d: 'mm'});
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });
      console.log('user pass: ', newUser)
      // Encrypt the password
      // hashes password and saves the user to database.
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if(err) throw err;
          newUser.password = hash;
          newUser.save().then((user) =>
             res.json(user)
          ).catch((err) => {
            console.log(err);
          });
        });
      });
    }
  });
});

//@routePost api/users/login
//@desc Login/user and returning JWT token
//@access public

router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;


  const { errors, isValid} = validateLoginInput(req.body);

  if (!isValid) {
      return res.status(400).json(errors);
  }
  // Find User by Email
  User.findOne({email}).then((user) => {
    // Check if user exists
    if (!user) {
      errors.email = 'User Does not exist!!!'
      return res.status(404).json({email: errors});
    }
    // Check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      // checks if password is correct
      if(isMatch) {
        //res.json({msg: 'login successful'});

        // create jwt payload
        const payload = {
          id: user.id,
          name: user.name,
          avatar: user.avatar
        }
        // sign token
        jwt.sign(payload, pwKey.passwordKey, {expiresIn: 4000}, (err, token) => {
          res.json({
            success: true,
            token: 'Bearer : ', token
          })
        })
      } else {
        errors.password = 'Password is wrong you noob'
        return res.status(400).json({msg: errors});
      }
    }).catch((err) => console.log(err));
  }).catch((err) => console.log(err));
});

//@routePost api/users/current
//@desc return private user
//@access private
router.get('/current', passport.authenticate('jwt', {session: false}), (req,res) => {
  // Determines current user
  console.log('res ', res)
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  });
});
module.exports = router;
