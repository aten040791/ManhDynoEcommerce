const { ParamWithLocale, QueryWithLocale } = require("kernels/rules");

const localeValidator = new QueryWithLocale("language")
  .notEmpty()
  .isLength({ min: 2, max: 10 });

const postIdValidator = new ParamWithLocale("postId").notEmpty().isNumberic();

module.exports = [localeValidator, postIdValidator];
