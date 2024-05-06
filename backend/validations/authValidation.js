const Joi = require("joi");
const { recoverPassword } = require("modules/auth/services/authService");

module.exports = {
  signIn: (data) => {
    const schema = Joi.object({
      email: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{8,20}@gmail.com$"))
        .messages({
          "string.pattern.base":
            "Email is not a valid pattern example214@gmail.com",
        })
        .required(),
      password: Joi.string().min(8).required(),
    });
    return schema.validate(data, {
      errors: { wrap: { label: "" } },
    });
  },

  signUp: (data) => {
    const schema = Joi.object({
      email: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{8,20}@gmail.com$"))
        .messages({
          "string.pattern.base":
            "Email is not a valid pattern example214@gmail.com",
        })
        .required(),
      password: Joi.string().min(8).required(),
      confirmPassword: Joi.string()
        .valid(Joi.ref("password"))
        .messages({
          "any.only": "Password and confirm password do not match",
        })
        .required(),
    });
    return schema.validate(data, {
      errors: { wrap: { label: "" } },
    });
  },

  recoverPassword: (data) => {
    const schema = Joi.object({
      email: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{8,20}@gmail.com$"))
        .messages({
          "string.pattern.base":
            "Email is not a valid pattern example214@gmail.com",
        })
        .required(),
    });
    return schema.validate(data, {
      errors: { wrap: { label: "" } },
    });
  },

  resetPassword: (data) => {
    const schema = Joi.object({
      email: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{8,20}@gmail.com$"))
        .messages({
          "string.pattern.base":
            "Email is not a valid pattern example214@gmail.com",
        })
        .required(),
      password: Joi.string().min(8).required(),
      confirmPassword: Joi.string()
        .valid(Joi.ref("password"))
        .messages({
          "any.only": "Password and confirm password do not match",
        })
        .required(),
    });
    return schema.validate(data, {
      errors: { wrap: { label: "" } },
    });
  },
};
