const Joi = require("joi");

module.exports = {
  signIn: (data) => {
    const schema = Joi.object({
      email: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{8,20}@gmail.com$"))
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
        .required(),
      password: Joi.string().min(8).required(),
      confirmPassword: Joi.ref("password").required(),
    });
    return schema.validate(data, {
      errors: { wrap: { label: "" } },
    });
  },
};
