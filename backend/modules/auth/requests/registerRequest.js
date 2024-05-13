const { body } = require('express-validator');
const BodyWithLocale = require('kernels/rules');
const db = require('models/index');

const emailValidator = new BodyWithLocale('email').notEmpty().isEmail().unique(db.User, 'email')

const passwordValidator = new BodyWithLocale('password').isLength({ min: 8 })

const confirmPasswordValidator = new BodyWithLocale('confirmPassword').notEmpty().confirmed('password')

module.exports = [
    emailValidator,
    passwordValidator,
    confirmPasswordValidator
]