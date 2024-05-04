const languageService = require("../services/languageServices");
const rs = require("../../../services/response");

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
      const languageId = req.params.languageId;
      if (!languageId) {
        return rs.missing(res, missing.message);
      }
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

  store: async (req, res) => {
    try {
      const name = req.body.name || null;
      const locale = req.body.locale || null;
      const flag = req.body.flag || null;

      if (!name || !locale || !flag) {
        return rs.missing(res, missing.message);
      }

      const response = await languageService.store(name, locale, flag);
      return rs.ok(res, response);
    } catch (error) {
      return rs.error(res, error.message);
    }
  },

  update: async (req, res) => {
    try {
      const languageId = req.params.languageId;
      const name = req.body.name;
      const locale = req.body.locale;
      const flag = req.body.flag;
      const response = await languageService.update(
        languageId,
        name,
        locale,
        flag
      );
      return rs.ok(res, response);
    } catch (error) {
      return rs.error(res, error.message);
    }
  },

  destroy: async (req, res) => {
    try {
      const languageId = req.params.languageId;
      const response = await languageService.destroy(languageId);
      return rs.ok(res, response);
    } catch (error) {
      return rs.error(res, error.message);
    }
  },
};
