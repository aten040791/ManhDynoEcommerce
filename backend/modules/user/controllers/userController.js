const rs = require('services/response');
const userService = require('modules/user/services/userService');

module.exports = {
    index: async (req, res) => {
        try {
            const users = await userService.index();
            if (users) {
                return rs.ok(res, {
                    users
                })
            } else {
                return rs.notFound()
            }
        } catch (error) {
            console.log(error);
        }
    },
    destroy: async (req, res) => {
        try {
            const id = req.query.id;
            if (id) {
                await userService.destroy(id);
                return rs.ok(res, {
                    mes: "Deleted user successfully"
                });
            } else {
                return rs.notFound();
            }
        } catch (error) {
            console.log(error);
        }
    }
}