const postService = require("modules/post/services/postService");
const response = require("utils/responseUtils");

module.exports = {
  index: async (req, res) => {
    const data = await postService.index();
    if (data.error) {
      return response.error(res, data.error);
    }
    return response.ok(res, data);
  },

  show: async (req, res) => {
    const data = await postService.show({ ...req.params, ...req.query });
    if (data.error) {
      return response.error(res, data.error);
    }
    return response.ok(res, data);
  },

  create: async (req, res) => {
    const data = await postService.create({
      ...req.body,
      ...req.query,
      ...req.user,
    });
    if (data.error) {
      return response.error(res, data.error);
    }
    return response.ok(res, data);
  },

  update: async (req, res) => {
    const data = await postService.update({
      ...req.body,
      ...req.query,
      ...req.params,
      ...req.user,
    });
    if (data.error) {
      return response.error(res, data.error);
    }
    return response.ok(res, data);
  },

  destroy: async (req, res) => {
    const data = await postService.destroy({ ...req.params, ...req.user });
    if (data.error) {
      return response.error(res, data.error);
    }
    return response.ok(res, data);
  },
};
