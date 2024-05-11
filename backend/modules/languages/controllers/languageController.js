const languageServices = require("modules/languages/services/languageServices");
const languageValidation = require("validations/languageValidation");
const rs = require("services/response");

module.exports = {
  index: async (req, res) => {
    try {
      const response = await languageServices.index();
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
      const { error } = languageValidation.show(req.params);
      if (error) {
        return rs.error(res, error.details[0].message);
      }
      const response = await languageService.show(req.params);
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
      const { error } = languageValidation.create(req.body);
      if (error) {
        return rs.error(res, error.details[0].message);
      }
      const response = await languageServices.create(req.body);
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
      const { error } = languageValidation.update({ ...req.body, ...req.params });
      if (error) {
        return rs.error(res, error.details[0].message);
      }

      const response = await languageServices.update({
        ...req.body,
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
      const { error } = validation.destroy(req.params);
      if (error) {
        return rs.error(res, error.details[0].message);
      }
      const response = await languageService.destroy(req.params);
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
