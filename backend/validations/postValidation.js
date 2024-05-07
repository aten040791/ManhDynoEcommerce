const Joi = require("joi");

module.exports = {
  show: (data) => {
    const schema = Joi.object({
      postId: Joi.number().required(),
      language: Joi.string()
        .regex(/^[a-z_]+$/)
        .min(2)
        .max(10)
        .default("en_us")
        .messages({
          "string.pattern.base":
            "The language locale contains only the characters a-z and _",
          "string.min": "Language locale must have at least 2 characters",
          "string.max": "Language locale must have at most 10 characters",
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
        .regex(/^[a-z_]+$/)
        .min(2)
        .max(10)
        .default("en_us")
        .messages({
          "string.pattern.base":
            "The language locale contains only the characters a-z and _",
          "string.min": "Language locale must have at least 2 characters",
          "string.max": "Language locale must have at most 10 characters",
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
        .regex(/^[a-z_]+$/)
        .min(2)
        .max(10)
        .default("en_us")
        .messages({
          "string.pattern.base":
            "The language locale contains only the characters a-z and _",
          "string.min": "Language locale must have at least 2 characters",
          "string.max": "Language locale must have at most 10 characters",
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
