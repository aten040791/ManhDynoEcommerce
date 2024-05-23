const { BodyWithLocale } = require("kernels/rules");

const emailValidator = new BodyWithLocale("email").notEmpty().isEmail();

module.exports = [emailValidator];
