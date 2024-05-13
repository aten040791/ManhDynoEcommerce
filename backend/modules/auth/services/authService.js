const model = require("../../../models/index");
const bcrypt = require("bcryptjs");
const { config } = require("configs");
const jwt = require("jsonwebtoken");
const response = require("services/response");

module.exports = {
  signIn: async (data) => {
    try {
      const { email, password } = data;

      const checkUser = await model.User.findOne({
        where: {
          email: email,
        },
      });

      if (!checkUser) {
        return {
          error: "Email not found",
        };
      }

      const isPasswordValid = await bcrypt.compare(
        password,
        checkUser.password
      );

      if (!isPasswordValid) {
        return {
          error: "Invalid password",
        };
      }

      const access_token = jwt.sign(
        { userId: checkUser.id, role: checkUser.role },
        config.jwt.secret,
        {
          expiresIn: "1h",
        }
      );
      return {
        data: {
          user: {
            id: checkUser.id,
            username: checkUser.username,
            email: checkUser.email,
            role: checkUser.role,
          },
          access_token: access_token,
        },
      };
    } catch (e) {
      throw new Error(e)
    }
  },

  signUp: async (data) => {
    const { email, password } = data;

    const newUser = await model.User.create({
      email: email,
      password: password,
      username: email,
      created_at: new Date(),
      updated_at: new Date(),
    });

    if (newUser) {
      return {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        created_at: newUser.created_at,
        updated_at: newUser.updated_at,
      };
    }
  },

  recoverPassword: async (data) => {
    try {
      const { email } = data;
      const checkUser = await model.User.findOne({ where: { email: email } });
      if (!checkUser) {
        return {
          error: "Email not found",
        };
      }
      return {
        data: "Email is valid",
      };
    } catch (error) {
      return {
        data: error.message,
      };
    }
  },
  resetPassword: async (data) => {
    try {
      const { email, password } = data;

      const checkUser = await model.User.findOne({ where: { email } });
      if (!checkUser) {
        return {
          error: "Email not found",
        };
      }
      checkUser.password = await bcrypt.hash(password, 10);
      await checkUser.save();
      return {
        data: "Password reset successful.",
      };
    } catch (error) {
        return {
          data: error.message,
        };
    }
  },
};
