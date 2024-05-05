const authService = require("../services/authService");
const rs = require("../../../services/response");
const validation = require("../../../validations/authValidation");

module.exports = {
  register: async (req, res) => {
    try {
      const { error } = validation.register(req.body);
      if (error) {
        return rs.error(res, error.details[0].message);
      }

      const { email, password, confirmPassword } = req.body;
      const response = await authService.register(
        email,
        password,
        confirmPassword
      );

      if (response) {
        return rs.ok(res, response);
      }
    } catch (error) {
      return rs.error(res, error.message);
    }
  },

  login: async (req, res) => {
    try {
      const { error } = validation.login(req.body);
      if (error) {
        return rs.error(res, error.details[0].message);
      }
      const { email, password } = req.body;
      const response = await authService.login(email, password);
      if (response) {
        return rs.ok(res, response);
      }
    } catch (error) {
      return rs.error(res, error.message);
    }
  },

  forgotPassword: async (req, res) => {
    try {
      const { error } = validation.forgotPassword(req.body);
      if (error) {
        return rs.error(res, error.details[0].message);
      }
      const { email, newPassword, confirmPassword } = req.body;
      const response = await authService.forgotPassword(
        email,
        newPassword,
        confirmPassword
      );
      if (response) {
        return rs.ok(res, response);
      }
    } catch (error) {
      return rs.error(res, error.message);
    }
  },
};
