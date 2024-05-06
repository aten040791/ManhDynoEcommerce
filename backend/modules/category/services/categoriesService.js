const db = require('models');

module.exports = {
    index: async () => {
        try {
            const response = await db.Category.findAll();
            return {
                data: response
            }
        } catch (err) {
            console.log(err);
        }
    },
    destroy: async (cid) => {
        try {
            const category = await db.Category.findOne({
                where: { id: cid },
                raw: true
            })
            if (category) {
                await category.destroy();
            }
        } catch (err) {
            console.log(err);
        }
    },
    store: async (name) => {
        try {
            const response = await db.Category.create({
                name,
                created_at: new Date(),
                updated_at: new Date(),
            });
            return {
                data: response,
            }
        } catch (error) {
            if (error.name === "SequelizeUniqueConstraintError") {
                return {
                    data: "Email already exists",
                };
            }
            return {
                data: error.message,
            };
        }

    },
    update: async (id, name) => {
        try {
            const updatedData = {};
            if (name) {
                updatedData.name = name;
            }
            updatedData.created_at = new Date();

            const response = await db.Category.update(updatedData, {
                where: {
                    id: id,
                }
            });

            if (response[0] === 1) {
                return {
                    data: response
                }
            } else {
                return {
                    data: "Not found"
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
}