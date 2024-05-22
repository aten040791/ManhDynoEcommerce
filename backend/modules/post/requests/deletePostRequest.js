const BodyWithLocale = require("kernels/rules");

const postIdValidator = new BodyWithLocale("postId").notEmpty().isNumberic();

module.exports = [postIdValidator];
