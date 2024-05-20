const postService = require("modules/post/services/postService");
const postValidation = require("modules/post/validations/postValidation");
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
      return response.error(res, response.error);
    }
    return response.ok(res, response);
  },


  create: async (req, res) => {
    const { userId } = req.user;
    const data = await postService.create({
      ...req.body,
      ...req.query,
      userId,
    });
    if (data.error) {
      return response.error(res, response.error);
    }
    return response.ok(res, data);
  },
  update: async (req, res) => {
    try {
      const { role, userId } = req.user;

      if (!userId && role != "owner") {
        return response.authorization(res, "Unauthorized");
      }

      const { error } = postValidation.update({
        ...req.body,
        ...req.query,
        ...req.params,
      });
      if (error) {
        return response.error(res, error.details[0].message);
      }
      const response = await postService.update({
        ...req.body,
        ...req.query,
        ...req.params,
        userId,
      });
      if (response.error) {
        return response.error(res, response.error);
      }
      if (response) {
        return response.ok(res, response);
      }
    } catch (error) {
      return response.error(res, error.message);
    }
  },
  destroy: async (req, res) => {
    try {
      const { role, userId } = req.user;

      if (!userId && role != "owner") {
        return response.authorization(res, "Unauthorized");
      }
      const { error } = postValidation.destroy(req.params);
      if (error) {
        return response.error(res, error.details[0].message);
      }
      const response = await postService.destroy({ ...req.params, userId });
      if (response.error) {
        return response.error(res, response.error);
      }
      if (response) {
        return response.ok(res, response);
      }
    } catch (error) {
      return response.error(res, error.message);
    }
  },
};
