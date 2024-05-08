const db = require('models');



module.exports = {
    index: async () => {
        try {
            const response = await db.User.findAll();
            if (response) {
                return {
                    data: response,
                }
            }
            return {
                error: "Cannot find resouces",
            };
        } catch (error) {
            return {
                error: error.message
            }
        }

    },
    destroy: async (data) => {
        try {
            const { userId } = data;
            const checkUser = await db.User.findByPk(userId);
            if(!checkUser) {
                return {
                    error: "User not found",
                }
            }
            const response = await db.User.destroy({
                where: {
                    id: checkUser.id,
                }
            })
            return {
                data: response == 1 ? "User deleted successfully" : "User deleted failed",
            }
        } catch (error) {
            return {
                error: error.message
            }
        }
    }
}