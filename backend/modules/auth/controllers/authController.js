const authService = require("../services/authService");
const rs = require("../../../services/response");
const validation = require("../../../validations/authValidation");

module.exports = {
  signIn: async (req, res) => {
    try {
      const { error } = validation.signIn(req.body);
      if (error) {
        return rs.error(res, error.details[0].message);
      }

      const response = await authService.signIn(req.body);
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
  signUp: async (req, res) => {
    try {
      const { error } = validation.signUp(req.body);
      if (error) {
        return rs.error(res, error.details[0].message);
      }
      const response = await authService.signUp(req.body);

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
