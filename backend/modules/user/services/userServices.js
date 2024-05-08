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
            await db.Post.destroy({
                where: {
                    user_id: checkUser.id
                }
            });
            await db.Language_Post.destroy({
                where: {
                    
                }
            });
            const response = await db.User.destroy({
                where: {
                    id: checkUser.id,
                }
            })
            if (response === 1) {
                return {
                    data: "User deleted successfully",
                };
            }
            return {
                error: "Failed to delete user",
            };
        } catch (error) {
            return {
                error: error.message
            }
        }
    }
}