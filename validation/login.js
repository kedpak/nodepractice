const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';


  if (!Validator.isLength(data.email, {min: 3, max: 30})) {
    errors.email = 'email is toooo short!!! who has an email that short?'
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Please input a email you baffoon!';
  }

  if (!Validator.isLength(data.password, {min: 6, max: 30})) {
    errors.password = 'Password needs atleast 6 characters bra';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Please the password cant be empty, duh';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
