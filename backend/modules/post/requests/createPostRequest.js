const { BodyWithLocale, QueryWithLocale } = require("kernels/rules");
const db = require("models/index");

const titleValidator = new BodyWithLocale("title")
  .notEmpty()
  .isLength({ min: 10, max: 100 })
  .unique(db.Post, "title");

const contentValidator = new BodyWithLocale("content").notEmpty();

const categoryIdValidator = new QueryWithLocale("categoryId")
  .notEmpty()
  .isNumberic();

const relatedIdValidator = new QueryWithLocale("relatedId")
  .notEmpty()
  .isNumberic();

const localeValidator = new QueryWithLocale("language")
  .notEmpty()
  .isLength({ min: 2, max: 10 });

module.exports = [
  localeValidator,
  titleValidator,
  contentValidator,
  categoryIdValidator,
  relatedIdValidator,
];
