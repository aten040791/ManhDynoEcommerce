const db = require('models');

module.exports = {
    index: async () => {
        const users = await db.User.findAll();
        if (users) {
            return {
                users: users,
            }
        }
    },
    destroy: async (data) => {
        const { userId } = data;
        const checkUser = await db.User.findByPk(userId);
        if (!checkUser) {
            return {
                error: "User not found",
            }
        }
        const user = await db.User.destroy({
            where: {
                id: checkUser.id,
            }
        })
        return {
            data: user == 1 ? "User deleted successfully" : "User deleted failed",
        }
    }
}