const { body } = require('express-validator');
const BodyWithLocale = require('kernels/rules');

const emailValidator = new BodyWithLocale('email').notEmpty().isEmail()

const passwordValidator = new BodyWithLocale('password').isLength({ min: 8 })

const confirmPasswordValidator = new BodyWithLocale('confirmPassword').confirmed('password')

module.exports = [
    emailValidator,
    passwordValidator,
    confirmPasswordValidator
]