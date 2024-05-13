const authService = require("modules/auth/services/authService");
const response = require("utils/responseUtils");

module.exports = {
  signIn: async (req, res) => {
    const data = await authService.signIn(req.body);
    if (data.error) {
      return response.error(res, data.error);
    }
    if (response) {
      return response.ok(res, {
        user: {
          email: data.user.email,
          username: data.user.username,
          role: 'user',
          created_at: new Date(),
          updated_at: new Date(),
        },
        access_token: data.access_token
      })
    }
  },

  signUp: async (req, res) => {
    const data = await authService.signUp(req.body);
    
    return response.ok(res, {
      user: {
        email: data.user.email,
        username: data.user.username,
        role: 'user',
        created_at: new Date(),
        updated_at: new Date(),
      },
      access_token: data.access_token
    })
  },

  recoverPassword: async (req, res) => {
    
    const data = await authService.recoverPassword(req.body);
    if (data.error) {
      return response.error(res, data.error);
    }
    
    return response.ok(res, {
      message: "Email sent"
    })
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
