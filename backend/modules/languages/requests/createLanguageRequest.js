const { BodyWithLocale } = require("kernels/rules");

const db = require("models/index");

const languageNameValidator = new BodyWithLocale("name")
  .notEmpty()
  .isLength({ min: 2, max: 20 });

const localeValidator = new BodyWithLocale("locale")
  .isLength({ min: 2, max: 10 })
  .unique(db.Language, "locale")
  .notEmpty();

const flagValidator = new BodyWithLocale("flag")
  .notEmpty()
  .isLength({ max: 255 });

module.exports = [languageNameValidator, localeValidator, flagValidator];
