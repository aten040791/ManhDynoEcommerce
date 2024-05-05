const model = require("../../../models/index");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
        { userId: checkUser.id, role_code: checkUser.role_code },
        process.env.JWT_SECRET_KEY,
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
            created_at: checkUser.created_at,
            update_at: checkUser.updated_at,
          },
          access_token: access_token,
        },
      };
    } catch (error) {
      return {
        data: error.message,
      };
    }
  },

  signUp: async (data) => {
    try {
      const { email, password } = data;

      const checkUser = await model.User.findOne({
        where: {
          email: email,
        },
      });
      if (checkUser) {
        return {
          error: "Email is already in used",
        };
      }
      const newUser = await model.User.create({
        email: email,
        password: password,
        username: email,
        created_at: new Date(),
        updated_at: new Date(),
      });
      const response = await model.User.findOne({
        where: {
          id: newUser.id,
        },
        attributes: { exclude: ["password"] },
      });

      return {
        data: response,
      };
    } catch (error) {
      return {
        data: error.message,
      };
    }
  },
};
