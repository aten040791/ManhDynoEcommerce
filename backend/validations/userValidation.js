const Joi = require('joi');

module.exports = {
    destroy: (data) => {
        const schema = Joi.object({
            userId: Joi.number().required(),
        });
        return schema.validate(data, {
            errors: { wrap: { label: "" } },
        });
    },
}