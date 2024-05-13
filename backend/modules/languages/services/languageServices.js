const model = require("../../../models/index");

const { Op } = require("sequelize");
module.exports = {
  index: async (req, res) => {
    try {
      const response = await model.Language.findAll({});
      if (response) {
        return {
          data: response,
        };
      }
      return {
        error: "Cannot find resouces",
      };
    } catch (error) {
      return {
        error: error.message,
      };
    }
  },

  show: async (data) => {
    try {
      const { languageId } = data;
      const response = await model.Language.findByPk(languageId);
      if (!response) {
        return {
          error: "Language not found",
        };
      }
      return {
        data: response,
      };
    } catch (error) {
      return {
        error: error.message,
      };
    }
  },

  create: async (data) => {
    const { name, locale, flag } = data;
    try {
      const checkLanguage = await model.Language.findOne({
        where: {
          locale: {
            [Op.eq]: locale,
          },
        },
      });
      if (checkLanguage) {
        return {
          error: "language locale has been used",
        };
      }
      const response = await model.Language.create({
        name: name,
        locale: locale,
        flag: flag,
        created_at: new Date(),
        updated_at: new Date(),
      });
      if (response) {
        return {
          data: "Language created successfully",
        };
      }
      return null;
    } catch (error) {
      return {
        error: error.message,
      };
    }
  },

  update: async (data) => {
    try {
      const { name, locale, flag, languageId } = data;
      const checkLanguage = await model.Language.findOne({
        where: {
          id: languageId,
        },
      });
      if (!checkLanguage) {
        return {
          error: "Language not found",
        };
      }

      const response = await model.Language.update(
        {
          name: name,
          locale: locale,
          flag: flag,
          updated_at: new Date(),
        },
        {
          where: {
            id: checkLanguage.id,
          },
        }
      );
      if (response == 1) {
        return {
          data: "Language updated successfully",
        };
      }
      return {
        data: "Failed to update language",
      };
    } catch (error) {
      return {
        error: error.message,
      };
    }
  },

  destroy: async (data) => {
    try {
      const { languageId } = data;
      const response = await model.Language.destroy({
        where: {
          id: languageId,
        },
      });
      if (response === 1) {
        return {
          data: "Language deleted successfully",
        };
      }
      return {
        error: "Failed to delete language",
      };
    } catch (error) {
      return {
        error: error.message,
      };
    }
  },
};
