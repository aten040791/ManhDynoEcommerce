const postService = require("../services/postServices");

module.exports = {
  index: async (req, res) => {
    try {
      const response = await postService.index();
      return res.status(200).send({
        success: true,
        data: response,
      });
    } catch (error) {
      return res.status(404).send({
        success: false,
        status: 404,
        message: error.message,
      });
    }
  },
};
