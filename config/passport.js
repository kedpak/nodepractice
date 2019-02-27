  const JwtStrategy = require('passport-jwt').Strategy;
  const ExtractJwt = require('passport-jwt').ExtractJwt;
  const mongoose = require('mongoose');
  const User = mongoose.model('users');
  const keys = require('../config/keys');
  const opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = keys.passwordKey;

  module.exports = passport => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id).then(user => {
        if (user) {
          return done(null, user) //null is error, user is what is returned
        }
        return done(null, false) // return false if there is no user;
      }).catch(err => console.log(err));
    })
    );
  };
