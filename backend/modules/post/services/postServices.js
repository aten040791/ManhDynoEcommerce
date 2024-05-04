const model = require("../../../models");
const { sequelize } = require("../../../models");
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

  show: async (postId) => {
    try {
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

  create: async (title, content, userId, categoryId, relatedId, language) => {
    try {
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
          return null;
        }
      }
      if (relatedId) {
        const checkPost = await model.Post.findByPk(relatedId);
        if (!checkPost) {
          return null;
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
        if (localeRelatedPost.localeCompare(language) !== 0) {
          return null;
        }
      }
      const result = await sequelize.transaction(async (t) => {
        const post = await model.Post.create(
          {
            user_id: userId,
            category_id: categoryId,
            related_id: relatedId,
            title: title,
            content: content,
            created_at: new Date(),
            updated_at: new Date(),
          },
          { transaction: t }
        );

        // const language_post = await model.Language_Post.create(

        //   {
        //     transaction: t,
        //   }
        // );
        // console.log(language_post);

        return post;
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
