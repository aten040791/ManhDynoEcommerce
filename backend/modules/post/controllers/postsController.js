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
};
