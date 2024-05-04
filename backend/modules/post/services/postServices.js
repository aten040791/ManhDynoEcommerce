const model = require("../../../models/index");

module.exports = {
  index: async () => {
    try {
      const response = await model.Post.findAll({});
      return {
        data: response,
      };
    } catch (error) {
      return {
        data: error.message,
      };
    }
  },

  show: async (postId) => {
    try {
      const response = await model.Post.findByPk(postId);
      return {
        data: response,
      };
    } catch (error) {
      return {
        data: error.message,
      };
    }
  },

  create: async (title, content, userId, categoryId, relatedId, language) => {
    try {
      console.log(title, content, language);
      if (userId) {
        const checkUser = await model.User.findByPk(userId);
        if (!checkUser) {
          return {
            data: "User not found",
          };
        }
      }
      if (categoryId) {
        const checkCategory = await model.Category.findByPk(categoryId);
        if (!checkCategory) {
          return {
            data: "Category not found",
          };
        }
      }
      if (relatedId) {
        const checkPost = await model.Post.findByPk(relatedId);
        if (!checkPost) {
          return {
            data: "Related Post not found",
          };
        }
      }
      if (language) {
        let localeRelatedPost = await model.Language_Post.findOne({
          attributes: ["locale"],
          where: {
            post_id: relatedId,
          },
        });
        localeRelatedPost = localeRelatedPost.toJSON().locale;
        if (localeRelatedPost == language) {
          return {
            data: "Language has been used by related post",
          };
        }
      }
      const response = await model.Post.create({
        user_id: userId,
        category_id: categoryId,
        related_id: relatedId,
        title: title,
        content: content,
        created_at: new Date(),
        updated_at: new Date(),
      });
      return {
        data: response,
      };
    } catch (error) {
      return {
        data: error.message,
      };
    }
  },
};
