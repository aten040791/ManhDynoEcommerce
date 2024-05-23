const { BodyWithLocale } = require("kernels/rules");
const db = require("models");

const categoryNameValidation = new BodyWithLocale("name")
  .isLength({ max: 20 })
  .notEmpty()
  .unique(db.Category, "name");

module.exports = {
  categoryNameValidation,
};
