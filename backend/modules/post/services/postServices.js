const model = require("../../../models");
const { sequelize } = require("../../../models");
const { Op } = require("sequelize");

module.exports = {
  index: async () => {
    try {
      const response = await model.Post.findAll({});
      if (response) {
        return {
          data: response,
        };
      }
      return null;
    } catch (error) {
      return {
        data: error.message,
      };
    }
  },

  show: async (data) => {
    try {
      const postId = data.postId;
      const response = await model.Post.findByPk(postId);
      if (response) {
        return {
          data: response,
        };
      }
      return null;
    } catch (error) {
      return {
        data: error.message,
      };
    }
  },

  create: async (data) => {
    try {
      const { title, content, userId, categoryId, relatedId, language } = data;
      let slug = "";
      if (title) {
        const checkTitle = await model.Post.findOne({
          where: {
            title: title,
          },
        });
        if (checkTitle) {
          return {
            error: "Title has been used",
          };
        }
        slug = title
          .replace(/đ/g, "d") // Thay thế ký tự "đ" thành "d"
          .normalize("NFKD") // Chuẩn hóa Unicode thành dạng "Compatibility Decomposition"
          .replace(/[^\w\s-]/g, "") // Loại bỏ các ký tự không phải chữ cái, số, hoặc dấu gạch ngang
          .split(" ")
          .join("-")
          .toLowerCase();
      }
      if (userId) {
        const checkUser = await model.User.findByPk(userId);
        if (!checkUser) {
          return {
            error: "User not found",
          };
        }
      }
      if (categoryId) {
        const checkCategory = await model.Category.findByPk(categoryId);
        if (!checkCategory) {
          return {
            error: "Category not found",
          };
        }
      }
      if (relatedId) {
        const checkPost = await model.Post.findByPk(relatedId);
        if (!checkPost) {
          return {
            error: "relatedId not found",
          };
        }
      }
      let checkLanguage = null;
      if (language) {
        checkLanguage = await model.Language.findOne({
          where: {
            locale: language,
          },
        });
        if (!checkLanguage) {
          return {
            error: "Language not found",
          };
        }
        let locales = await model.Post.findAll({
          attributes: ["locale"],
          where: {
            [Op.or]: [{ related_id: relatedId }, { id: relatedId }],
          },
        });
        locales = locales.map((post) => post.dataValues.locale);
        if (locales.includes(language)) {
          return {
            error: "Language has been used",
          };
        }
      }
      const result = await sequelize.transaction(async (t) => {
        const newPost = await model.Post.create(
          {
            user_id: userId,
            category_id: categoryId,
            related_id: relatedId,
            locale: language,
            title: title,
            slug: slug,
            content: content,
            created_at: new Date(),
            updated_at: new Date(),
          },
          { transaction: t }
        );

        await model.Language_Post.create(
          {
            language_id: checkLanguage.id,
            post_id: newPost.id,
            locale: language,
            created_at: new Date(),
            updated_at: new Date(),
          },
          { transaction: t }
        );
        return newPost;
      });

      return {
        data: result,
      };
    } catch (error) {
      return {
        data: error.message,
      };
    }
  },
};
