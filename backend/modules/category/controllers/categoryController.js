const categoryService = require('modules/category/services/categoryServices');
const rs = require('services/response');
const validate = require('validations/categoryValidation');

module.exports = {
    index: async (req, res) => {
        try {
            const response = await categoryService.index(); //categories
            if (response.error) {
                return rs.error(res, response.error);
            }
            if (response) {
                return rs.ok(res, response);
            }
        } catch (error) {
            return rs.error(res, error.message);
        }
    },
    show: async (req, res) => {
        try {
            const { error } = validate.show(req.params);
            if (error) {
                return rs.error(res, error.details[0].message);
            }
            const response = await categoryService.show(req.params);
            if (response.error) {
                return rs.error(res, response.error);
            }
            if (response) {
                return rs.ok(res, response);
            }
        } catch (error) {
            return rs.error(res, error.message);
        }
    },
    create: async (req, res) => {
        try {
            const { error } = validate.create(req.body);
            if (error) {
                return rs.error(res, error.details[0].message);
            }
            const response = await categoryService.create(req.body);
            if (response.error) {
                return rs.error(res, response.error);
            }
            if (response) {
                return rs.ok(res, response);
            }
        } catch (error) {
            return rs.error(res, error.message);
        }
    },
    update: async (req, res) => {
        try {
            const { error } = validate.update({ ...req.body, ...req.params });
            if (error) {
                return rs.error(res, error.details[0].message);
            }
            const response = await categoryService.update({
                ...req.body,
                ...req.params,
            });
            if (response.error) {
                return rs.error(res, response.error);
            }
            if (response) {
                return rs.ok(res, response);
            }
        } catch (error) {
            return rs.error(res, error.message);
        }
    },
    destroy: async (req, res) => {
        try {
            const { error } = validate.destroy(req.params);
            if (error) {
                return rs.error(res, error.details[0].message);
            }
            const response = await categoryService.destroy(req.params);
            if (response.error) {
                return rs.error(res, response.error);
            }
            if (response) {
                return rs.ok(res, response);
            }
        } catch (error) {
            return rs.error(res, error.message);
        }
    }
}