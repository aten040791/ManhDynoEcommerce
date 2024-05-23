const { ParamWithLocale } = require("kernels/rules");

const postIdValidator = new ParamWithLocale("postId").notEmpty().isNumberic();

module.exports = [postIdValidator];
