const Joi = require('joi');

module.exports = {
    create: (data) => {
        const schema = Joi.object({
            categoryName: Joi.string.max(20).required(),
        });
        return schema.validate(data, {
            errors: { wrap: { label: "" } },
        });
    },
    update: (data) => {
        const schema = Joi.object({
            categoryId: Joi.number().required(),
            categoryName: Joi.string.max(20).required(),
        });
        return schema.validate(data, {
            errors: { wrap: { label: "" } },
        });
    },
    destroy: (data) => {
        const schema = Joi.object({
            categoryId: Joi.number().required(),
        });
        return schema.validate(data, {
            errors: { wrap: { label: "" } },
        });
    }
}