const languageService = require("../services/languageServices");

module.exports = {
  index: async (req, res) => {
    try {
      const response = await languageService.index();

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
      const languageId = req.params.languageId;
      if (!languageId) {
        return res.status(400).send({
          success: false,
          status: 400,
          message: "Missing languageId parameter",
        });
      }
      const response = await languageService.show(languageId);

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

  create: async (req, res) => {
    try {
      const name = req.body.name || null;
      const locale = req.body.locale || null;
      const flag = req.body.flag || null;

      if (!name || !locale || !flag) {
        return res.status(400).send({
          data: "Missing required information",
        });
      }

      const response = await languageService.create(name, locale, flag);
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
      return res.status(200).send({
        success: true,
        data: response.data,
        status: 200,
        message: "ok",
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
        status: 500,
        message: error,
      });
    }
  },

  destroy: async (req, res) => {
    try {
      const languageId = req.params.languageId;
      const response = await languageService.destroy(languageId);
      return res.status(200).send({
        success: true,
        data: response.data,
        status: 200,
        message: "ok",
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
        status: 500,
        message: error,
      });
    }
  },
};
