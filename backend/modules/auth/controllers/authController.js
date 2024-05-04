const authService = require("../services/authService");
const rs = require("../../../services/response");

module.exports = {
  register: async (req, res) => {
    try {
      const email = req.body.email;
      const password = req.body.password;
      const response = await authService.register(email, password);
      if (response) {
        return rs.ok(res, response);
      }
    } catch (error) {
      return rs.error(res, error.message);
    }
  },

  login: async (req, res) => {
    try {
      const email = req.body.email;
      const password = req.body.password;
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
      const email = req.body.email;
      const newPassword = req.body.newPassword;
      const response = await authService.forgotPassword(email, newPassword);
      if (response) {
        return rs.ok(res, response);
      }
    } catch (error) {
      return rs.error(res, error.message);
    }
  },
};
