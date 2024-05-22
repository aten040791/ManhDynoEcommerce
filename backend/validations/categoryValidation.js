const Joi = require('joi');
const {BodyWithLocale} = require('kernels/rules');

module.exports = {
    show: (data) => {

        new BodyWithLocale('categoryId').notEmpty().isLength({max: 20})

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