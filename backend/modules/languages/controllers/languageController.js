const languageServices = require("modules/languages/services/languageServices");
const response = require("utils/responseUtils");

module.exports = {
  index: async (req, res) => {
    const data = await languageServices.index();
    if (data.error) {
      return response.error(res, data.error);
    }
    return response.ok(res, {
      languages: data.allLanguage,
    });
  },

  show: async (req, res) => {
    const data = await languageServices.show(req.params);
    if (data.error) {
      return response.error(res, data.error);
    }
    return response.ok(res, {
      language: data.language,
    });
  },

  create: async (req, res) => {
    const data = await languageServices.create(req.body);
    if (data.error) {
      return response.error(res, data.error);
    }
    return response.ok(res, {
      newlanguage: data.newLanguage,
    });
  },

  update: async (req, res) => {
    const data = await languageServices.update({
      ...req.body,
      ...req.params,
    });
    if (data.error) {
      return response.error(res, data.error);
    }
    return response.ok(res, {
      message: "Language updated successfully",
    });
  },

  destroy: async (req, res) => {
    const data = await languageServices.destroy(req.params);
    if (data.error) {
      return response.error(res, data.error);
    }
    return response.ok(res, {
      message: "Language deleted successfully",
    });
  },
};
