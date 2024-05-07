const Joi = require("joi");

module.exports = {
  show: (data) => {
    const schema = Joi.object({
      postId: Joi.number().required(),
      language: Joi.string()
        .pattern(/^[a-z_]$/)
        .min(2)
        .max(10)
        .default("en_us")
        .messages({
          "string.pattern.base":
            "The language locale contains only the characters a-z and _",
          "any.required": "Language locale is required",
        }),
    });
    return schema.validate(data, {
      errors: { wrap: { label: "" } },
    });
  },

  create: (data) => {
    const schema = Joi.object({
      title: Joi.string().min(10).max(100).required(),
      content: Joi.string().required(),
      categoryId: Joi.number().required(),
      relatedId: Joi.number().required(),
      language: Joi.string()
        .pattern(/^[a-z_]$/)
        .required()
        .min(2)
        .max(10)
        .messages({
          "string.pattern.base":
            "The language locale contains only the characters a-z and _",
          "any.required": "Language locale is required",
        }),
    });
    return schema.validate(data, {
      errors: { wrap: { label: "" } },
    });
  },

  update: (data) => {
    const schema = Joi.object({
      postId: Joi.number().required(),
      title: Joi.string().min(10).max(100).required(),
      content: Joi.string().required(),
      categoryId: Joi.number().required(),
      language: Joi.string()
        .pattern(/^[a-z_]$/)
        .required()
        .min(2)
        .max(10)
        .messages({
          "string.pattern.base":
            "The language locale contains only the characters a-z and _",
          "any.required": "Language locale is required",
        }),
    });
    return schema.validate(data, {
      errors: { wrap: { label: "" } },
    });
  },

  destroy: (data) => {
    const schema = Joi.object({
      postId: Joi.number().required(),
    });
    return schema.validate(data, {
      errors: { wrap: { label: "" } },
    });
  },
};
