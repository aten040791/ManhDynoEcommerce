const db = require('models');

module.exports = {
    index: async () => {
        try {
            const response = await db.Category.findAll({});
            if (response) {
                return {
                    data: response,
                };
            }
            return {
                error: "Cannot find resouces",
            };
        } catch (error) {
            return {
                error: error.message,
            };
        }
    },
    create: async (data) => {
        const { name } = data;
        try {
            const checkCategory = await db.Category.findOne({
                where: {
                    name: name,
                }
            })
            if (checkCategory) {
                return {
                    error: "Category name has been used",
                }
            }
            const response = await db.Category.create({
                name: name,
                created_at: new Date(),
                updated_at: new Date(),
            });
            if (response) {
                return {
                    data: "Category created sucessfully",
                }
            }
            return null;
        } catch (error) {
            return {
                error: error.message,
            };
        }
    },
    show: async (data) => {
        try {
            const { categoryId } = data;
            const response = await db.Category.findByPk(categoryId);
            if (!response) {
                return {
                    error: "Category not found",
                }
            }
            return {
                data: response
            }
        } catch (error) {
            return {
                error: error.message,
            };
        }
    },
    update: async (data) => {
        try {
            const { categoryId, name} = data;
            const checkCategory = await db.Category.findByPk(categoryId);
            if (!checkCategory) {
                return {
                    error: "Category not found",
                }
            }
            const response = await db.Category.update({
                name: name,
                updated_at: new Date(),
            }, {
                where: {
                    id: categoryId,
                }
            })
            return {
                data: response ? "Category updated successfully" : "Category updated failed",
            };
        } catch (error) {
            return {
                error: error.message,
            };
        }
    },
    destroy: async (data) => {
        try {
            const { categoryId } = data;
            const checkCategory = await db.Category.findByPk(categoryId);
            if (!checkCategory) {
                return {
                    error: "Category not found",
                }
            }
            const response = await db.Category.destroy({
                where: {
                    id: categoryId,
                }
            });
            return {
                data:
                    response == 1 ? "Category deleted successfully" : "Category deleted failed",
            };
        } catch (error) {
            return {
                error: error.message,
            };
        }
    },
}