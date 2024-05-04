const postService = require("../services/postServices");
const rs = require("../../../services/response");
module.exports = {
  index: async (req, res) => {
    try {
      const response = await postService.index();
      if (response) {
        return rs.ok(res, response);
      }
      return rs.notFound(res);
    } catch (error) {
      return rs.error(res, error.message);
    }
  },

  show: async (req, res) => {
    try {
      const postId = req.params.postId;
      if (!postId) {
        return rs.missing(res, "Missing postId parameter");
      }
      const response = await postService.show(postId);
      if (response) {
        return rs.ok(res, response);
      }
      return rs.notFound(res);
    } catch (error) {
      return rs.error(res, error.message);
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

      if (!title && !content) {
        return rs.missing(res, "Missing title or content of post");
      }

      const res = await postService.create(
        title,
        content,
        userId,
        categoryId,
        relatedId,
        language
      );

      const { error, ...response } = res;

      if (response) {
        return rs.ok(res, response);
      }

      return rs.error(res, error);
    } catch (error) {
      return rs.error(res, error.message);
    }
  },
};
