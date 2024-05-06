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
            return null;
        } catch (error) {
            return {
                error: error.message
            }
        }
    },
    destroy: async (data) => {
        try {
            const { categoryId } = data;
            const response = await db.Category.destroy({
                where: {
                    id: categoryId
                }
            });
            if (response == 1) {
                return {
                    data: "Category deleted successfully"
                };
            }
            return {
                error: "Failed to delete category"
            }

        } catch (error) {
            return {
                error: error.message
            }

        }
    },
    create: async (data) => {
        try {
            const { categoryName } = data;
            const response = await db.Category.create({
                name: categoryName,
                created_at: new Date(),
                updated_at: new Date(),
            });
            if(response) {
                return {
                    data: "Category created successfully"
                }
            }
            return null;
        } catch (error) {
            return {
                error: error.message,
            };
        }

    },
    update: async (data) => {
        try {
            const { categoryId, categoryName } = data;
            const checkCategory = await db.Category.findOne({
                where: {
                    id: categoryId,
                }
            })
            if (!checkCategory) {
                return {
                    error: "Category not found"
                }
            }

            const response = await db.Category.update({
                name: categoryName,
                updated_at: new Date(),
            }, {
                where: {
                    id: checkCategory.id,
                }
            })

            if (response === 1) {
                return {
                    data: "Category updated successfully"
                }
            } else {
                return {
                    data: "Failed to update category"
                }
            }
        } catch (error) {
            return {
                error: error.message
            }
        }
    }
}