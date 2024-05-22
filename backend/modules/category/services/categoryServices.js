const db = require('models');

module.exports = {
    index: async () => {
        const categories = await db.Category.findAll({});
        if (categories) {
            return {
                categories: categories,
            };
        }
        return {
            error: "Cannot find resouces",
        };
    },
    create: async (data) => {
        const { name } = data;
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
        const category = await db.Category.create({
            name: name,
            created_at: new Date(),
            updated_at: new Date(),
        });
        if (category) {
            return {
                category: category
            }
        }
        return null;
    },
    show: async (data) => {
        const { categoryId } = data;
        const category = await db.Category.findByPk(categoryId);
        if (!category) {
            return {
                error: "Category not found",
            }
        }
        return {
            category: category
        }
    },
    update: async (data) => {
        const { categoryId, name } = data;
        const checkCategory = await db.Category.findByPk(categoryId);
        if (!checkCategory) {
            return {
                error: "Category not found",
            }
        }
        const category = await db.Category.update({
            name: name,
            updated_at: new Date(),
        }, {
            where: {
                id: categoryId,
            }
        })
        return {
            data: category ? "Category updated successfully" : "Category updated failed",
        };
    },
    destroy: async (data) => {
        const { categoryId } = data;
        const checkCategory = await db.Category.findByPk(categoryId);
        if (!checkCategory) {
            return {
                error: "Category not found",
            }
        }
        const category = await db.Category.destroy({
            where: {
                id: categoryId,
            }
        });
        return {
            data:
                category == 1 ? "Category deleted successfully" : "Category deleted failed",
        };
    },
}