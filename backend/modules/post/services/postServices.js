const model = require("../../../models");
const { sequelize } = require("../../../models");
const slugify = require("slugify");
const { Op } = require("sequelize");

module.exports = {
  index: async () => {
    try {
      const response = await model.Post.findAll({
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
  show: async (data) => {
    try {
      const { postId, language } = data;

      let querySql = {};
      //Nếu query params truyền vào chỉ mỗi postId: lấy như bình thường
      if (!language || language == "en_us") {
        querySql = {
          id: postId,
        };
      } else {
        //Nếu query params truyền vào gồm cả postId và language: thì postId đó chính là relatedId
        //Tức là lấy bài viết con của bài viết hiện tại
        querySql = {
          related_id: postId,
          locale: language,
        };
      }

      const response = await model.Post.findOne({
        where: querySql,
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
      if (!response) {
        return {
          error: "Post not found",
        };
      }
      return {
        data: response,
      };
    } catch (error) {
      return {
        error: error.message,
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
        slug = slugify(title, {
          replacement: "-",
          remove: undefined,
          lower: true,
          locale: "vi",
          trim: true,
        });
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

      if (relatedId > 0) {
        const checkPost = await model.Post.findByPk(relatedId);
        if (!checkPost) {
          return {
            error: "relatedId not found",
          };
        }
      }
      let checkLanguage = null;
      if (language) {
        // console.log("Running");
        checkLanguage = await model.Language.findOne({
          where: {
            locale: {
              [Op.eq]: language,
            },
          },
        });
        if (checkLanguage && relatedId == 0 && language != "en_us") {
          // Tạo bài viết không phải là bài mặc định
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
    } catch (error) {
      return {
        error: error.message,
      };
    }
  },
  update: async (data) => {
    try {
      const { title, content, userId, categoryId, language, postId } = data;
      let curPost = null;
      if (postId) {
        curPost = await model.Post.findByPk(postId);
        if (!curPost) {
          return {
            error: "Post not found",
          };
        }
      }
      if (userId) {
        const checkUser = await model.User.findByPk(userId);
        if (!checkUser) {
          return {
            error: "User not found",
          };
        }
      }
      if (curPost.user_id != userId) {
        return {
          error: "No authorization",
        };
      }
      if (categoryId) {
        const checkCategory = await model.Category.findByPk(categoryId);
        if (!checkCategory) {
          return {
            error: "Category not found",
          };
        }

        if (checkCategory.id != curPost.category_id) {
          return {
            error: "Category not match with post",
          };
        }
      }
      if (language) {
        const checkLanguage = await model.Language.findOne({
          where: {
            locale: language,
          },
        });
        if (!checkLanguage) {
          return {
            error: "Language not found",
          };
        }
        if (checkLanguage.locale != curPost.locale) {
          return {
            error: "Language not match with post",
          };
        }
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
        data: response ? "Post updated successfully" : "Post updated failed",
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
      await model.Language_Post.destroy({
        where: {
          post_id: checkPost.id,
        },
      });
      const respone = await model.Post.destroy({
        where: {
          id: checkPost.id,
        },
      });
      return {
        data: respone ? "Post deleted successfully" : "Post deleted failed",
      };
    } catch (error) {
      return {
        error: error.message,
      };
    }
  },
};
