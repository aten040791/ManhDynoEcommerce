const {BodyWithLocale} = require("kernels/rules");

const emailValidator = new BodyWithLocale('email').notEmpty().isEmail()

const passwordValidator = new BodyWithLocale('password').notEmpty().isLength({ min: 8 })

module.exports = [
    emailValidator,
    passwordValidator
]