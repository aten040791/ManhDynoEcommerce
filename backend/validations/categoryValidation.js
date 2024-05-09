const Joi = require('joi');

module.exports = {
    show: (data) => {
        const schema = Joi.object({
            categoryId: Joi.number().required(),
        });
        return schema.validate(data, {
            errors: { wrap: { label: "" } },
        });
    },
    create: (data) => {
        const schema = Joi.object({
            name: Joi.string().max(20).required(),
        });
        return schema.validate(data, {
            errors: { wrap: { label: "" } },
        });
    },
    update: (data) => {
        const schema = Joi.object({
            categoryId: Joi.number().required(),
            name: Joi.string().max(20).required(),
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
    },
}