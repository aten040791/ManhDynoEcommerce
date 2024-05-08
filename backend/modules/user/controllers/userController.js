const userService = require('modules/user/services/userServices');
const rs = require('services/response');
const validate = require('validations/userValidation');


module.exports = {
    index: async (req, res) => {
        try {
            const response = await userService.index();
            if (response.error) {
                return rs.error(res, response.error)
            }
            if (response) {
                return rs.ok(res, response)
            }
        } catch (error) {
            return rs.error(res, error.message);
        }
    },
    destroy: async (req, res) => {
        try {
            const { role, userId } = req.user;
            console.log(role, userId);
            if (!userId && role != "admin") {
                return rs.authorization(res, "Unauthorized");
            }
            const { error } = validate.destroy(req.params);
            if (error) {
                return rs.error(res, error.details[0].message);
            }
            const response = await userService.destroy({ ...req.params });
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