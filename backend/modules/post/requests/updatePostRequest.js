const {
  BodyWithLocale,
  QueryWithLocale,
  ParamWithLocale,
} = require("kernels/rules");
const db = require("models/index");

const localeValidator = new QueryWithLocale("language")
  .isLength({ min: 2, max: 10 })
  .unique(db.Language, "language")
  .isString()
  .notEmpty();

const titleValidator = new BodyWithLocale("title")
  .notEmpty()
  .isLength({ min: 10, max: 100 })
  .unique(db.Post, "title")
  .isString();

const contentValidator = new BodyWithLocale("content").notEmpty().isString();

const categoryIdValidator = new QueryWithLocale("categoryId")
  .notEmpty()
  .isNumberic()
  .isIn();
const postIdValidator = new ParamWithLocale("postId")
  .notEmpty()
  .isNumberic()
  .isIn();

module.exports = [
  localeValidator,
  titleValidator,
  contentValidator,
  categoryIdValidator,
  postIdValidator,
];
