const { body } = require("express-validator");
const BodyWithLocale = require("kernels/rules");

const emailValidator = new BodyWithLocale('email').isEmail().notEmpty()

const passwordValidator = new BodyWithLocale('password').notEmpty().isLength({ min: 8 })

module.exports = [
    emailValidator,
    passwordValidator
]