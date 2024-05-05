const Joi = require("joi");

module.exports = {
  register: (data) => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
      confirmPassword: Joi.string().min(8).required(),
    });
    return schema.validate(data, {
      errors: { wrap: { label: "" } },
    });
  },

  login: (data) => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });
    return schema.validate(data, {
      errors: { wrap: { label: "" } },
    });
  },

  forgotPassword: (data) => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      newPassword: Joi.string().min(8).required(),
      confirmPassword: Joi.string().min(8).required(),
    });
    return schema.validate(data, {
      errors: { wrap: { label: "" } },
    });
  },
};
