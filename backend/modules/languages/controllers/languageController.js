const languageService = require("../services/languageServices");
const rs = require("../../../services/response");
const validation = require("../../../validations/languageValidation");

module.exports = {
  index: async (req, res) => {
    try {
      const response = await languageService.index();
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
      const { error } = validation.show(req.params);
      if (error) {
        return rs.error(res, error.details[0].message);
      }

      const languageId = req.params.languageId;
      const response = await languageService.show(languageId);

      if (response.data) {
        return rs.ok(res, response);
      } else {
        return rs.notFound(res);
      }
    } catch (error) {
      return rs.error(res, error.message);
    }
  },

  create: async (req, res) => {
    try {
      const { error } = validation.create(req.body);
      if (error) {
        return rs.error(res, error.details[0].message);
      }
      const { name, locale, flag } = req.body;
      const response = await languageService.create(name, locale, flag);
      if (response) {
        return rs.ok(res, response);
      } else {
        return rs.error(res, "Failed to create language");
      }
    } catch (error) {
      return rs.error(res, error.message);
    }
  },

  update: async (req, res) => {
    try {
      const { error } = validation.update({ ...req.body, ...req.params });
      if (error) {
        return rs.error(res, error.details[0].message);
      }
      const languageId = req.params.languageId;
      const { name, locale, flag } = req.body;
      const response = await languageService.update(
        languageId,
        name,
        locale,
        flag
      );
      if (response) {
        return rs.ok(res, response);
      } else {
        return rs.error(res, "Failed to update language");
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
      const languageId = req.params.languageId;
      const response = await languageService.destroy(languageId);
      if (response) {
        return rs.ok(res, response);
      } else {
        return rs.error(res, "Failed to delete language");
      }
    } catch (error) {
      return rs.error(res, error.message);
    }
  },
};
