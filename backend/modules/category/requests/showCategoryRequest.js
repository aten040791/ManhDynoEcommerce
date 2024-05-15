const BodyWithLocale = require("kernels/rules");

const categoryIdValidation = new BodyWithLocale('id').isNumberic().notEmpty();

module.exports = {
    categoryIdValidation
}