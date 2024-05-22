const BodyWithLocale = require("kernels/rules");
const db = require("models/index");

const titleValidator = new BodyWithLocale("title")
  .notEmpty()
  .isLength({ min: 10, max: 100 })
  .unique(db.Post, "title");

const contentValidator = new BodyWithLocale("content").notEmpty();

// const categoryIdValidator = new BodyWithLocale("categoryId")
//   .notEmpty()
//   .isNumberic();

// const relatedIdValidator = new BodyWithLocale("relatedId")
//   .notEmpty()
//   .isNumberic();

// const localeValidator = new BodyWithLocale("language")
//   .notEmpty()
//   .isLength({ min: 2, max: 10 })
//   .unique(db.Language, "language");

module.exports = [
  // localeValidator,
  titleValidator,
  contentValidator,
  // categoryIdValidator,
  // relatedIdValidator,
];
