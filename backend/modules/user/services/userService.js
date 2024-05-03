const db = require('models')

module.exports = {
    getAllUsersService: async() => {
        try {
            const response = await db.User.findAll();
            return {
                data: response
            }
        } catch (err) {
            console.log(err);
        }
    },
    deleteUserService: async(uid) => {
        try {
            const user = await db.User.findOne({
                where: { id: uid }
            })
            if (user) {
                await user.destroy();
            }
        } catch (err) {
            console.log(err);
        }
    },
}