const model = require("models");
const { sequelize } = require("models");
const stringUtils = require("utils/stringUtils");
const { Op } = require("sequelize");

module.exports = {
  index: async () => {
    const allPost = await model.Post.findAll({
      where: {
        locale: "en",
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

    let whereCondition = {};
    if (language === "en") {
      whereCondition = {
        id: postId,
      };
    } else {
      whereCondition = {
        related_id: postId,
        locale: language,
      };
    }
    const detailsPost = await model.Post.findOne({
      where: whereCondition,
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
    const { title, content, userId, categoryId, relatedId, language } = data;
    const slug = stringUtils.slugify(title);

    const checkCategory = await model.Category.findByPk(categoryId);
    if (!checkCategory) {
      return {
        error: "Category not found",
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
          error: "The language in this post has been chosen",
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
      if (checkLanguage && relatedId == 0 && language != "en_us") {
        return {
          error: "Please make sure to create the post in English first.",
        };
      }
    }

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
  },
  update: async (data) => {
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
      slug = stringUtils.slugify(title);
    }

    const updatedPost = await model.Post.update(
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
    return updatedPost == 1
      ? "Post updated successfully"
      : "Post updated failed";
  },
  destroy: async (data) => {
    const { postId, userId } = data;
    const checkPost = await model.Post.findByPk(postId);
    if (!checkPost) {
      return {
        error: "Post not found or has been deleted",
      };
    }
    if (checkPost.user_id != userId) {
      return {
        error: "You are not the creator of this post",
      };
    }
    const deletedPost = await model.Post.destroy({
      where: {
        id: checkPost.id,
      },
    });
    return deletedPost == 1
      ? "Post deleted successfully"
      : "Post deleted failed";
  },
};
