const Post = require("../../../models").Post;
module.exports = {
  index: async (res, data) => {
    try {
      const res = Post.findAll();
      console.log(res);
      return res.status(200).send({
        success: true,
        ...data,
        status: 200,
        message: "ok",
      });
    } catch (error) {
      return res.status(404).send({
        success: false,
        status: 404,
        message: "Cannot find resouces",
      });
    }
  },
};
