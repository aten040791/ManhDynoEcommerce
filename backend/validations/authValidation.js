const Joi = require("joi");

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
};
