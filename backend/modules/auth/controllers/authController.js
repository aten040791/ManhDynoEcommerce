const authService = require("modules/auth/services/authService");
const rs = require("services/response");
const response = require("services/response");

module.exports = {
  signIn: async (req, res) => {
    try {
      const response = await authService.signIn(req.body);
      if (response.error) {
        return rs.error(res, response.error);
      }
      const data = response.data;
      if (response) {
        return rs.ok(res, data)
      }
    } catch (e) {
      response.error(res, e.message)
    }
  },

  signUp: async (req, res) => {
    const data = await authService.signUp(req.body);
    
    return response.ok(res, {
      user: data
    })
  },

  recoverPassword: async (req, res) => {
    try {
      const response = await authService.recoverPassword(req.body);
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

  resetPassword: async (req, res) => {
    try {
      const response = await authService.resetPassword(req.body);
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
