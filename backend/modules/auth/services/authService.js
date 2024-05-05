const model = require("../../../models/index");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  register: async (email, password, confirmPassword) => {
    try {
      if (password !== confirmPassword) {
        return {
          error: "Password and confirm password do not match",
        };
      }
      const hashPassword = await bcrypt.hash(password, 10);
      const newUser = await model.User.create({
        email,
        password: hashPassword,
        username: "",
        created_at: new Date(),
        updated_at: new Date(),
      });
      const userWithoutPassword = { ...newUser.toJSON() };
      delete userWithoutPassword.password;
      return {
        user: userWithoutPassword,
      };
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        return {
          error: "Email already exists",
        };
      }
      return {
        data: error.message,
      };
    }
  },

  login: async (email, password) => {
    try {
      const user = await model.User.findOne({ where: { email } });
      if (!user) {
        return {
          error: "No user found with this email",
        };
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return {
          error: "Invalid password",
        };
      }

      const token = jwt.sign({ userId: user.id }, "secret-key", {
        expiresIn: "1h",
      });
      const userWithoutPassword = { ...user.toJSON() };
      delete userWithoutPassword.password;

      return { user: userWithoutPassword, token };
    } catch (error) {
      return {
        data: error.message,
      };
    }
  },

  recoverPassword: async (email) => {
    try {
      const user = await model.User.findOne({ where: { email } });
      if (!user) {
        return {
          error: "No user found with this email",
        };
      }
      return { user: user };
    } catch (error) {
      return {
        data: error.message,
      };
    }
  },

  resetPassword: async (email, newPassword, confirmPassword) => {
    try {
      if (newPassword !== confirmPassword) {
        return {
          error: "New password and confirm password do not match",
        };
      }
      const user = await model.User.findOne({ where: { email } });
      if (!user) {
        return {
          error: "No user found with this email",
        };
      }
      user.password = await bcrypt.hash(newPassword, 10);
      await user.save();
      const userWithoutPassword = { ...user.toJSON() };
      delete userWithoutPassword.password;
      return {
        user: userWithoutPassword,
      };
    } catch (error) {
      return {
        data: error.message,
      };
    }
  },
};
