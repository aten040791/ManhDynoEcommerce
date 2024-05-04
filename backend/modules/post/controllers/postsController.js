const postService = require("../services/postServices");
const rs = require("../../../services/response");
const Joi = require("joi");

const {
  userId,
  cateId,
  language,
  postId,
  relatedId,
  title,
  content,
} = require("../../../helpers/validation");

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
      const error = Joi.object({ postId }).validate(req.params, {
        errors: { wrap: { label: "" } },
      });
      if (error) {
        rs.error(res, error);
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
      const { error } = Joi.object({
        userId,
        cateId,
        language,
        relatedId,
        title,
        content,
      }).validate(
        { ...req.body, ...req.query },
        { errors: { wrap: { label: "" } } }
      );
      if (error) {
        return rs.error(res, error.details[0].message);
      }
      // if (!title && !content) {
      //   return rs.missing(res, "Missing title or content of post");
      // }

      // const response = await postService.create(res);

      // if (response.error) {
      //   return rs.error(res, response.error);
      // }

      // if (response) {
      //   return rs.ok(res, response);
      // }
    } catch (error) {
      return rs.error(res, error.message);
    }
  },
};
