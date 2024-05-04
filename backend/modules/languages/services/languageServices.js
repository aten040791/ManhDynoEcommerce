const model = require("../../../models/index");

module.exports = {
  index: async () => {
    try {
      const response = await model.Language.findAll({});
      return {
        data: response,
      };
    } catch (error) {
      return {
        data: error.message,
      };
    }
  },

  show: async (languageId) => {
    try {
      const response = await model.Language.findByPk(languageId);
      return {
        data: response,
      };
    } catch (error) {
      return {
        data: error.message,
      };
    }
  },

  store: async (name, locale, flag) => {
    try {
      console.log(name, locale, flag);

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
        return {
          data: "Language name or locale already exists",
        };
      }
      return {
        data: error.message,
      };
    }
  },

  update: async (id, name, locale, flag) => {
    try {
      const updateData = {};
      if (name) updateData.name = name;
      if (locale) updateData.locale = locale;
      if (flag) updateData.flag = flag;
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
        return {
          data: "Language not found",
        };
      }
    } catch (error) {
      return {
        data: error.message,
      };
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
        return {
          data: "Language not found",
        };
      }
    } catch (error) {
      return {
        data: error.message,
      };
    }
  },
};
