const postService = require("../services/postServices");
const rs = require("../../../services/response");
const validate = require("../../../validations/postValidation.js");

module.exports = {
  index: async (req, res) => {
    try {
      const response = await postService.index();
      if (response.error) {
        return rs.error(res, response.error);
      }
      if (response) {
        return rs.ok(res, response);
      }
    } catch (error) {
      return rs.error(res, error.message);
    }
  },
  show: async (req, res) => {
    try {
      const { error } = validate.show({ ...req.params, ...req.query });
      if (error) {
        return rs.error(res, error.details[0].message);
      }
      const response = await postService.show({ ...req.params, ...req.query });
      if (response.error) {
        return rs.error(res, response.error);
      }
      if (response) {
        return rs.ok(res, response);
      }
    } catch (error) {
      return rs.error(res, error.message);
    }
  },
  create: async (req, res) => {
    try {
      const { error } = validate.create({ ...req.body, ...req.query });
      if (error) {
        return rs.error(res, error.details[0].message);
      }
      const response = await postService.create({ ...req.body, ...req.query });
      if (response.error) {
        return rs.error(res, response.error);
      }
      if (response) {
        return rs.ok(res, response);
      }
    } catch (error) {
      return rs.error(res, error.message);
    }
  },
  update: async (req, res) => {
    try {
      const { error } = validate.update({
        ...req.body,
        ...req.query,
        ...req.params,
      });
      if (error) {
        return rs.error(res, error.details[0].message);
      }
      const response = await postService.update({
        ...req.body,
        ...req.query,
        ...req.params,
      });
      if (response.error) {
        return rs.error(res, response.error);
      }
      if (response) {
        return rs.ok(res, response);
      }
    } catch (error) {
      return rs.error(res, error.message);
    }
  },
  destroy: async (req, res) => {
    try {
      const { error } = validate.destroy(req.params);
      if (error) {
        return rs.error(res, error.details[0].message);
      }
      const response = await postService.destroy(req.params);
      if (response.error) {
        return rs.error(res, response.error);
      }
      if (response) {
        return rs.ok(res, response);
      }
    } catch (error) {
      return rs.error(res, error.message);
    }
  },
};
