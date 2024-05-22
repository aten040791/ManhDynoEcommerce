const BodyWithLocale = require("kernels/rules");
const db = require("models/index");

const localeValidator = new BodyWithLocale("language")
  .notEmpty()
  .isLength({ min: 2, max: 10 })
  .unique(db.Language, "language");

const postIdValidator = new BodyWithLocale("postId").notEmpty().isNumberic();

module.exports = [localeValidator, postIdValidator];
