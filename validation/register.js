const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : ''; // Checks if empty, if it is then it is empty string
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : ''; // Confirm password

  if (!Validator.isLength(data.name, {min: 2, max: 30})) {
    // Validate if character numbers are not 2-30
    errors.name = 'Name must be between 2 and 30 characters!!!!';
  }

  if (Validator.isEmpty(data.name)) {
    // Validate if name field is empty string
    errors.name = 'Please input a name! Name field is required!';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Please input a email you baffoon!';
  }

  if (!Validator.isLength(data.email, {min: 3, max: 30})) {
    errors.email = 'email is toooo short!!! who has an email that short?'
  }

  if (!Validator.isLength(data.password, {min: 6, max: 30})) {
    errors.password = 'Password needs atleast 6 characters bra';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Please the password cant be empty, duh';
  }

  if (!Validator.isLength(data.password2, {min: 6, max: 30})) {
    errors.password2 = 'Password needs atleast 6 characters bra';
  }
  
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'Please the password cant be empty, duh';
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwords do not match dudeee';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
