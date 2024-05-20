const BodyWithLocale = require("kernels/rules");
const db = require("models/index");

// lowercase
const localeValidator = new BodyWithLocale("language")
  .isLength({ min: 2, max: 10 })
  .unique(db.Language, "language")
  .notEmpty();

// String
const title = new BodyWithLocale("title")
  .isLength({ min: 10, max: 100 })
  .unique(db.Post, "title")
  .notEmpty();
const content = new BodyWithLocale("content").notEmpty(); //String
const categoryId = new BodyWithLocale("categoryId").isNumberic().notEmpty();
const relatedId = new BodyWithLocale("relatedId").isNumberic().notEmpty(); //Not Found

module.exports = [localeValidator, title, content, categoryId, relatedId];
