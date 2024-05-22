const categoryService = require('modules/category/services/categoryServices');
const response = require('utils/responseUtils');

module.exports = {
    index: async (req, res) => {
        const categories = await categoryService.index(); //categories
        if (categories.error) {
            return response.error(res, categories.error);
        }
        if (categories) {
            return response.ok(res, categories);
        }
    },
    show: async (req, res) => {
        const category = await categoryService.show(req.params);
        if (category.error) {
            return response.error(res, category.error);
        }
        if (category) {
            return response.ok(res, category);
        }
    },
    create: async (req, res) => {
        const category = await categoryService.create(req.body);
        if (category.error) {
            return response.error(res, category.error);
        }
        if (category) {
            return response.ok(res, category);
        }
    },
    update: async (req, res) => {
        const category = await categoryService.update({
            ...req.body,
            ...req.params,
        });
        if (category.error) {
            return response.error(res, category.error);
        }
        if (category) {
            return response.ok(res, category);
        }
    },
    destroy: async (req, res) => {
        const category = await categoryService.destroy(req.params);
        if (category.error) {
            return response.error(res, category.error);
        }
        if (category) {
            return response.ok(res, category);
        }
    }
}