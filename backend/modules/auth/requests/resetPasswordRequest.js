const {BodyWithLocale} = require("kernels/rules");

const passwordValidator = new BodyWithLocale("password").notEmpty();

const passwordConfirmationValidator = new BodyWithLocale("confirmPassword")
  .notEmpty()
  .confirmed("password");

module.exports = [passwordValidator, passwordConfirmationValidator];
