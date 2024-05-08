const db = require('models');



module.exports = {
    index: async () => {
        try {
            const response = await db.Category.findAll();
            if (response) {
                return {
                    data: response
                }
            }
            return {
                error: "Can't find resource"
            }
        } catch (error) {
            
        }
    }
}