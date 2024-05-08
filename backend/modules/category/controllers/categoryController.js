const categoryService = require('modules/category/services/categoryServices');
const rs = require('services/response');
const validate = require('validations/categoryValidation');

module.exports = {
    index: async (req, res) => {
        try {
            const response = await categoryService.index();
            if(response.error){
                return rs.error(res, response.message);
            }
            if(response) {
                return rs.ok(res, response);
            }
        } catch (error) {
            return rs.error(res, error.message);
        }
    }
}