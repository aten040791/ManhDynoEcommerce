const model = require("../../../models/index");

module.exports = {
  index: () =>
    new Promise(async (resolve, reject) => {
      try {
        const response = await model.Post.findAll();
        resolve({
          data: response,
        });
      } catch (error) {
        reject({
          data: error,
        });
      }
    }),

  show: (postId) =>
    new Promise(async (resolve, reject) => {
      try {
        const response = await model.Post.findByPk(postId);
        resolve({
          data: response,
        });
      } catch (error) {
        reject({
          data: error,
        });
      }
    }),

  create: (title, content, userId, categoryId, relatedId, language) =>
    new Promise(async (resolve, reject) => {
      try {
        console.log(title, content, language);
        if (userId) {
          const checkUser = await model.User.findByPk(userId);
          if (!checkUser) {
            resolve({
              data: "User not found",
            });
          }
        }
        if (categoryId) {
          const checkCategory = await model.Category.findByPk(categoryId);
          if (!checkCategory) {
            resolve({
              data: "Category not found",
            });
          }
        }
        if (relatedId) {
          const checkPost = await model.Post.findByPk(relatedId);
          if (!checkPost) {
            resolve({
              data: "Post not found",
            });
          }
        }
        if (language) {
          console.log(language);
          // const langRelated = model.Language_Post.findOne({
          //   where: {
          //     post_id: relatedId,
          //   },
          // });
          // console.log(langRelated);
        }
        const response = await model.Post.create({
          user_id: userId,
          category_id: categoryId,
          related_id: relatedId,
          // title: title,
          // content: content,
          created_at: new Date(),
          updated_at: new Date(),
        });
        resolve({
          data: response,
        });
      } catch (error) {
        reject({
          data: error,
        });
      }
    }),
};
