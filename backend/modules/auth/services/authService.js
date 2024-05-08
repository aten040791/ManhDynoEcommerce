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
        { userId: checkUser.id, role: checkUser.role },
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
            role: checkUser.role,
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
};
