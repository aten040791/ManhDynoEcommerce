const {BodyWithLocale} = require('kernels/rules');
const db = require('models/index');

const emailValidator = new BodyWithLocale('email').notEmpty().isEmail()

module.exports = [
    emailValidator
]