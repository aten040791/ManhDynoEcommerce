const { BodyWithLocale } = require("kernels/rules");

const categoryIdValidation = new BodyWithLocale("id").notEmpty().isNumberic();

module.exports = {
  categoryIdValidation,
};
