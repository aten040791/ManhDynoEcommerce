const Joi = require("joi");

module.exports = {
  email: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{8,20}@gmail.com$"))
    .required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{8,30}$")).required(),
  title: Joi.string().min(10).max(100).required(),
  content: Joi.string().required(),
  userId: Joi.number().required(),
  cateId: Joi.number().required(),
  postId: Joi.number().required(),
  relatedId: Joi.number().required(),
  language: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9_-]{2,10}$"))
    .required(),
};
