const db = require('models')

module.exports = {
    getAllUsersService: () => new Promise(async (resolve, reject) => {
        try {
            const response = await db.User.findAll();
            resolve({
                data: response
            });
        } catch (err) {
            reject(err);
        }
    }),
    deleteUserService: (uid) => new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findOne({
                where: { id: uid }
            })
            if(user){
                await user.destroy();
            }
            resolve();
        } catch (err) {
            reject(err);
        }
    }),
}