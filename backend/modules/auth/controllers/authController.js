const authService = require("modules/auth/services/authService");
const rs = require("services/response");
const authValidation = require("modules/auth/validations/authValidation");
const response = require("services/response");

module.exports = {
  signIn: async (req, res) => {
    try {
      const { error } = authValidation.signIn(req.body);
      if (error) {
        return rs.error(res, error.details[0].message);
      }

      const response = await authService.signIn(req.body);
      if (response.error) {
        return rs.error(res, response.error);
      }
      const data = response.data;
      if (response) {
        res
          .status(200)
          .cookie("access_token", response.data.access_token, {
            httpOnly: true,
          })
          .send({
            success: true,
            data,
            status: 200,
            message: "ok",
          });
      }
    } catch (error) {
      return rs.error(res, error.message);
    }
  },

  signUp: async (req, res) => {
    const data = await authService.signUp(req.body);
    
    return response.ok(res, data)
  },

  recoverPassword: async (req, res) => {
    try {
      const { error } = authValidation.recoverPassword(req.body);
      if (error) {
        return rs.error(res, error.details[0].message);
      }
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
      const { error } = authValidation.signUp(req.body);
      if (error) {
        return rs.error(res, error.details[0].message);
      }
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
