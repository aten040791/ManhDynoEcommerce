const model = require("models");
const { sequelize } = require("models");
const slugify = require("slugify");
const { Op } = require("sequelize");

module.exports = {
  index: async () => {
    const allPost = await model.Post.findAll({
      where: {
        locale: "en_us",
      },
      attributes: { exclude: ["user_id", "category_id"] },
      include: [
        {
          model: model.User,
          as: "author",
          attributes: { exclude: ["password"] },
        },
        {
          model: model.Category,
          as: "category",
        },
      ],
    });

    if (allPost) {
      return allPost;
    } else {
      return {
        error: "Cannot find resouces",
      };
    }
  },
  show: async (data) => {
    const { postId, language } = data;
    const detailsPost = await model.Post.findOne({
      where: {
        post_id: postId,
        locale: language,
      },
      attributes: { exclude: ["user_id", "category_id"] },
      include: [
        {
          model: model.User,
          as: "author",
          attributes: { exclude: ["password"] },
        },
        {
          model: model.Category,
          as: "category",
        },
      ],
    });
    if (!detailsPost) {
      return {
        error: "Post not found",
      };
    }
    return detailsPost;
  },

  create: async (data) => {
    try {
      const { title, content, userId, categoryId, relatedId, language } = data;

      const slug = slugify(title, {
        replacement: "-",
        remove: undefined,
        lower: true,
        locale: "vi",
        trim: true,
      });

      if (relatedId == 0 && language != "en_us") {
        return {
          error: "Please make sure to create the post in English first.",
        };
      }

      if (relatedId > 0) {
        let locales = await model.Post.findAll({
          attributes: ["locale"],
          where: {
            [Op.or]: [{ related_id: relatedId }, { id: relatedId }],
          },
        });
        locales = locales.map((post) => post.dataValues.locale.toLowerCase());
        if (locales.includes(language.toLowerCase())) {
          return {
            error: "Language has been used",
          };
        }
      }

      // let checkLanguage = null;
      // if (language) {
      //   checkLanguage = await model.Language.findOne({
      //     where: {
      //       locale: {
      //         [Op.eq]: language,
      //       },
      //     },
      //   });
      //   if (checkLanguage && relatedId == 0 && language != "en_us") {
      //     return {
      //       error: "Please make sure to create the post in English first.",
      //     };
      //   }

      // }

      const result = await sequelize.transaction(async (t) => {
        const newPost = await model.Post.create(
          {
            user_id: userId,
            category_id: categoryId,
            related_id: relatedId,
            locale: language.toLowerCase(),
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
            // language_id: checkLanguage.id,
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
        error: error.message,
      };
    }
  },
  update: async (data) => {
    try {
      const { title, content, userId, categoryId, language, postId } = data;

      const curPost = await model.Post.findByPk(postId);
      if (!curPost) {
        return {
          error: "Post not found",
        };
      }

      if (curPost.user_id != userId) {
        return {
          error: "No authorization",
        };
      }

      if (categoryId != curPost.category_id) {
        return {
          error: "Category not match with post",
        };
      }

      if (language != curPost.locale) {
        return {
          error: "Language not match with post",
        };
      }

      let slug = curPost.slug;
      if (curPost.title !== title) {
        slug = slugify(title, {
          replacement: "-",
          remove: undefined,
          lower: true,
          locale: "vi",
          trim: true,
        });
      }

      const response = await model.Post.update(
        {
          title: title,
          category_id: categoryId,
          content: content,
          slug: slug,
          updated_at: new Date(),
        },
        {
          where: {
            id: postId,
          },
        }
      );
      return {
        data:
          response == 1 ? "Post updated successfully" : "Post updated failed",
      };
    } catch (error) {
      return {
        error: error.message,
      };
    }
  },
  destroy: async (data) => {
    try {
      const { postId, userId } = data;
      const checkPost = await model.Post.findByPk(postId);
      if (!checkPost) {
        return {
          error: "Post not found or has been deleted",
        };
      }
      if (checkPost.user_id != userId) {
        return {
          error: "No authorization",
        };
      }
      const respone = await model.Post.destroy({
        where: {
          id: checkPost.id,
        },
      });
      return {
        data:
          respone == 1 ? "Post deleted successfully" : "Post deleted failed",
      };
    } catch (error) {
      return {
        error: error.message,
      };
    }
  },
};
