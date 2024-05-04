const model = require("../../../models/index");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  register: async (email, password) => {
    try {
      const hashPassword = await bcrypt.hash(password, 10);
      const newUser = await model.User.create({
        email,
        password: hashPassword,
        created_at: new Date(),
        updated_at: new Date(),
      });
      return {
        data: newUser,
      };
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        return {
          data: "Email already exists",
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
        throw new Error("No user found with this email");
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error("Invalid password");
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

  forgotPassword: async (email, newPassword) => {
    try {
      const user = await model.User.findOne({ where: { email } });
      if (!user) {
        throw new Error("No user found with this email");
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
