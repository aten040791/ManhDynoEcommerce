const postService = require("../services/postServices");

module.exports = {
  index: async (req, res) => {
    try {
      const response = await postService.index();
      return res.status(200).send({
        success: true,
        data: response.data,
        status: 200,
        message: "ok",
      });
    } catch (error) {
      return res.status(404).send({
        success: false,
        status: 404,
        message: error,
      });
    }
  },

  show: async (req, res) => {
    try {
      const postId = req.params.postId;
      if (!postId) {
        return res.status(400).send({
          success: false,
          status: 400,
          message: "Missing postId parameter",
        });
      }
      const response = await postService.show(postId);

      if (response.data) {
        return res.status(200).send({
          success: true,
          data: response.data,
          status: 200,
          message: "ok",
        });
      } else {
        return res.status(404).send({
          success: false,
          status: 404,
          message: "Cannot find resouces",
        });
      }
    } catch (error) {
      return res.status(404).send({
        success: false,
        status: 404,
        message: error,
      });
    }
  },
  create: async (req, res) => {
    try {
      const userId = req.query.userId || null;
      const categoryId = req.query.categoryId || null;
      const relatedId = req.query.relatedId || 0;
      const language = req.query.language || "en-US";
      const title = req.body.title || null;
      const content = req.body.content || null;
      console.log(userId, categoryId, relatedId, language, title, content);
      if (!title && !content) {
        return res.status(400).send({
          success: false,
          status: 400,
          message: "Missing title or content of post ",
        });
      }

      const response = await postService.create(
        title,
        content,
        userId,
        categoryId,
        relatedId,
        language
      );

      return res.status(200).send({
        success: true,
        data: response,
        status: 200,
        message: "ok",
      });
    } catch (error) {
      return res.status(404).send({
        success: false,
        status: 404,
        message: error,
      });
    }
  },
};
