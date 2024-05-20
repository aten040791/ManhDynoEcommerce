const BodyWithLocale = require("kernels/rules");
const db = require("models/index");

//thiếu lowercase
const localeValidator = new BodyWithLocale("language")
  .isLength({ min: 2, max: 10 })
  .unique(db.Language, "language")
  .notEmpty();

//not Found
const postIdValidator = new BodyWithLocale("postId").isNumberic().notEmpty();

//Nếu truyền vào là 1 id --> Tồn tại hay không
//Nếu truyền vào là 1 trường bất --> Nếu tồn tại trả về id của trường đó
module.exports = [localeValidator, postIdValidator];
