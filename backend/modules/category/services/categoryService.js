const db = require('models')

module.exports = {
    index: async ()  => {
        try {
            const response = await db.Category.findAll();
            return {
                data: response
            }
        } catch (err) {
            console.log(err);
        }
    },
    update: async () => {
        try {
            
        } catch (error) {
            console.log(err);
        }
    },
    
    destroy: async(uid) => {
        try {
            const category = await db.Category.findOne({
                where: { id: uid }
            })
            if (category) {
                await category.destroy();
            }
        } catch (err) {
            console.log(err);
        }
    },
}