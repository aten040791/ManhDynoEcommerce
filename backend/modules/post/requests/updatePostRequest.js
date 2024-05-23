const {
  BodyWithLocale,
  QueryWithLocale,
  ParamWithLocale,
} = require("kernels/rules");
const db = require("models/index");

const localeValidator = new QueryWithLocale("language")
  .isLength({ min: 2, max: 10 })
  .notEmpty();

const titleValidator = new BodyWithLocale("title")
  .notEmpty()
  .isLength({ min: 10, max: 100 })
  .unique(db.Post, "title");

const contentValidator = new BodyWithLocale("content").notEmpty().isString();

const categoryIdValidator = new QueryWithLocale("categoryId")
  .notEmpty()
  .isNumberic();
const postIdValidator = new ParamWithLocale("postId").notEmpty().isNumberic();

module.exports = [
  localeValidator,
  titleValidator,
  contentValidator,
  categoryIdValidator,
  postIdValidator,
];
