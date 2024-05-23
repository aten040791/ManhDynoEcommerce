const { BodyWithLocale } = require("kernels/rules");

const idUserValidation = new BodyWithLocale("userId").notEmpty().isNumberic();

module.exports = {
  idUserValidation,
};
