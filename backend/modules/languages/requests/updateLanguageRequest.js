const { BodyWithLocale } = require("kernels/rules");

const db = require("models/index");

const languageNameValidator = new BodyWithLocale("name").isLength({
  min: 2,
  max: 20,
});

const localeValidator = new BodyWithLocale("locale")
  .isLength({ min: 2, max: 10 })
  .unique(db.Language, "locale");

const flagValidator = new BodyWithLocale("flag").isLength({ max: 255 });

module.exports = [languageNameValidator, localeValidator, flagValidator];
