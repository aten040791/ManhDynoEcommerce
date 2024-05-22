const model = require("../../../models/index");
const bcrypt = require("bcryptjs");

const jwtUtils = require("utils/jwtUtils");

module.exports = {
  signIn: async (data) => {
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
    const isPasswordValid = await bcrypt.compare(password, checkUser.password);
    if (!isPasswordValid) {
      return {
        error: "Invalid credentials",
      };
    }
    return {
      user: checkUser,
      access_token: jwtUtils.sign(checkUser.id, checkUser.role),
    };
  },

  signUp: async (data) => {
    const { email, password, username } = data;
    const user = await model.User.create({
      email: email,
      password: password,
      username: username,
      role: "user",
      created_at: new Date(),
      updated_at: new Date(),
    });
    if (user) {
      return {
        user,
        access_token: jwtUtils.sign(user.id, user.role),
      };
    }
    return {
      error: "Failed to create user",
    };
  },

  recoverPassword: async (data) => {
    const { email } = data;
    const checkUser = await model.User.findOne({ where: { email: email } });
    if (!checkUser) {
      return {
        error: "Email not found",
      };
    }
    return true;
  },

  resetPassword: async (data) => {
    const { email, password } = data;

    const checkUser = await model.User.findOne({ where: { email: email } });
    if (!checkUser) {
      return {
        error: "Email not found",
      };
    }

    const updateUser = await checkUser.update({
      password: password,
    });
    if (updateUser) {
      return true;
    }
    return {
      error: "Failed to update user",
    };
  },
};
