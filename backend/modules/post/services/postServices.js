const model = require("../../../models/index");
const Post = model.Post;
module.exports = {
  index: () =>
    new Promise(async (resolve, reject) => {
      try {
        const response = await Post.findAll();
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
