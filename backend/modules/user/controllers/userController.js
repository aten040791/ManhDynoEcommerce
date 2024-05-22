const userService = require('modules/user/services/userServices');
const response = require('utils/responseUtils');

module.exports = {
    index: async (req, res) => {
        const users = await userService.index();
        if (users.error) {
            return response.error(res, users.error)
        }
        if (users) {
            return response.ok(res, users)
        }
    },
    destroy: async (req, res) => {
        const user = await userService.destroy({ ...req.params });
        if (user.error) {
            return response.error(res, user.error);
        }
        if (user) {
            return response.ok(res, user);
        }
    }
}