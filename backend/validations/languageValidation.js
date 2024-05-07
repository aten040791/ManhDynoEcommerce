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
      name: Joi.string().pattern(new RegExp("^[a-zA-Z_]{2,20}$")).required(),
      locale: Joi.string()
        .pattern(new RegExp("^[a-z_]{2,10}$"))
        .required()
        .messages({
          "string.pattern.base":
            "The language locale contains only the characters a-z and _",
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
      name: Joi.string().pattern(new RegExp("^[a-zA-Z_]{2,20}$")),
      locale: Joi.string().pattern(new RegExp("^[a-z_]{2,10}$")).messages({
        "string.pattern.base":
          "The language locale contains only the characters a-z and _",
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
