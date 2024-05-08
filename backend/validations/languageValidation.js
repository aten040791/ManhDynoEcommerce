const Joi = require("joi");

module.exports = {
  show: (data) => {
    const schema = Joi.object({
      languageId: Joi.number().required(),
    });
    return schema.validate(data, {
      errors: { wrap: { label: "" } },
    });
  },

  create: (data) => {
    const schema = Joi.object({
      name: Joi.string().max(20).required(),
      locale: Joi.string()
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
      flag: Joi.string().required(),
    });
    return schema.validate(data, {
      errors: { wrap: { label: "" } },
    });
  },

  update: (data) => {
    const schema = Joi.object({
      languageId: Joi.number().required(),
      name: Joi.string().max(20),
      locale: Joi.string()
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
      flag: Joi.string(),
    });
    return schema.validate(data, {
      errors: { wrap: { label: "" } },
    });
  },

  destroy: (data) => {
    const schema = Joi.object({
      languageId: Joi.number().required(),
    });
    return schema.validate(data, {
      errors: { wrap: { label: "" } },
    });
  },
};
