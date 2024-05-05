const model = require("../../../models/index");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  signIn: async (data) => {
    try {
      const { email, password } = data;
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
      throw new Error(error.message);
    }
  },

  signUp: async (data) => {
    try {
      const { email, password } = data;
      const hashPassword = await bcrypt.hash(password, 10);
      const newUser = await model.User.create({
        email: email,
        password: hashPassword,
        username: email,
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
        throw new Error("Email already exists");
      }
      throw new Error(error.message);
    }
  },
};
