const {BodyWithLocale} = require("kernels/rules");
const db = require("models/index");

const localeValidator = new BodyWithLocale("language")
  .isLength({ min: 2, max: 10 })
  .unique(db.Language, "language")
  .notEmpty();

const titleValidator = new BodyWithLocale("title")
  .isLength({ min: 10, max: 100 })
  .unique(db.Post, "title")
  .notEmpty();
const contentValidator = new BodyWithLocale("content").notEmpty();
const categoryIdValidator = new BodyWithLocale("categoryId")
  .isNumberic()
  .notEmpty();
const postIdValidator = new BodyWithLocale("postId").notEmpty().isNumberic();

module.exports = [
  localeValidator,
  titleValidator,
  contentValidator,
  categoryIdValidator,
  postIdValidator,
];
