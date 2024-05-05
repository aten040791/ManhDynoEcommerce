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
      name: Joi.string().pattern(new RegExp("^[a-zA-Z_]{2,10}$")).required(),
      locale: Joi.string().pattern(new RegExp("^[a-zA-Z_]{2,10}$")).required(),
      flag: Joi.string().required(),
    });
    return schema.validate(data, {
      errors: { wrap: { label: "" } },
    });
  },

  update: (data) => {
    const schema = Joi.object({
      languageId: Joi.number().required(),
      name: Joi.string().pattern(new RegExp("^[a-zA-Z_]{2,10}$")).required(),
      locale: Joi.string().pattern(new RegExp("^[a-zA-Z_]{2,10}$")).required(),
      flag: Joi.string().required(),
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
