const { BodyWithLocale } = require("kernels/rules");

const categoryNameValidation = new BodyWithLocale("name")
  .isLength({ max: 20 })
  .notEmpty();
const categoryIdValidation = new BodyWithLocale("id").notEmpty().isNumberic();

module.exports = {
  categoryNameValidation,
  categoryIdValidation,
};
