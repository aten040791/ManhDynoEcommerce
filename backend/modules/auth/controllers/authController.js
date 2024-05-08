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
};
