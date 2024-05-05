const Joi = require("joi");

module.exports = {
  show: (data) => {
    const schema = Joi.object({
      postId: Joi.number().required(),
    });
    return schema.validate(data, {
      errors: { wrap: { label: "" } },
    });
  },

  create: (data) => {
    const schema = Joi.object({
      title: Joi.string().min(10).max(100).required(),
      content: Joi.string().required(),
      userId: Joi.number().required(),
      categoryId: Joi.number().required(),
      relatedId: Joi.number().required(),
      language: Joi.string()
        .pattern(new RegExp("^[a-zA-Z_]{2,10}$"))
        .required()
        .messages({
          "string.pattern.base": "Language locale is invalid",
          "any.required": "Language locale is required",
        }),
    });
    return schema.validate(data, {
      errors: { wrap: { label: "" } },
    });
  },
};
