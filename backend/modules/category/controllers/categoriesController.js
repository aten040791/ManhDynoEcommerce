const rs = require('services/response');
const catService = require('modules/category/services/categoriesService');
const validation = require('validations/categoryValidation');

module.exports = {
    index: async (req, res) => {
        try {
            const response = await catService.index();
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
            const { error } = validation.destroy(req.params);
            if (error) {
                return rs.error(res, error.details[0].message);
            }
            const response = await catService.destroy(req.params);
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
            const { error } = validation.create(req.body);
            if (error) {
                return rs.error(res, error.details[0].message);
            }
            const response = await catService.create(req.body);
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
            const { error } = validation.update({ ...req.body, ...req.params });
            if (error) {
                return rs.error(res, error.details[0].message);
            }

            const response = await catService.update({
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
}