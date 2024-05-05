const model = require("../../../models/index");

module.exports = {
  index: async () => {
    try {
      const response = await model.Language.findAll({});
      return {
        data: response,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  },

  show: async (languageId) => {
    try {
      const response = await model.Language.findByPk(languageId);
      return {
        data: response,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  },

  create: async (name, locale, flag) => {
    try {
      const response = await model.Language.create({
        name: name,
        locale: locale,
        flag: flag,
        created_at: new Date(),
        updated_at: new Date(),
      });
      return {
        data: response,
      };
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        const field = error.errors[0].path;
        const data = `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } already exists`;
        throw new Error(data);
      }
      throw new Error(error.message);
    }
  },

  update: async (id, name, locale, flag) => {
    try {
      const updateData = {};
      updateData.name = name;
      updateData.locale = locale;
      updateData.flag = flag;
      updateData.updated_at = new Date();

      const response = await model.Language.update(updateData, {
        where: {
          id: id,
        },
      });

      if (response[0] === 1) {
        return {
          data: "Language updated successfully",
        };
      } else {
        throw new Error("Language not found");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  },

  destroy: async (id) => {
    try {
      const response = await model.Language.destroy({
        where: {
          id: id,
        },
      });
      if (response === 1) {
        return {
          data: "Language deleted successfully",
        };
      } else {
        throw new Error("Language not found");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
