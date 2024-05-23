const { BodyWithLocale } = require("kernels/rules");
const db = require("models/index");

const emailValidator = new BodyWithLocale("email")
  .notEmpty()
  .isEmail()
  .unique(db.User, "email");
const usernameValidator = new BodyWithLocale("username")
  .notEmpty()
  .unique(db.User, "username");

const passwordValidator = new BodyWithLocale("password")
  .notEmpty()
  .isLength({ min: 8 });

const confirmPasswordValidator = new BodyWithLocale("confirmPassword")
  .notEmpty()
  .confirmed("password");

module.exports = [
  emailValidator,
  usernameValidator,
  passwordValidator,
  confirmPasswordValidator,
];
