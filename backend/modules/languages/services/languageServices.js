const model = require("../../../models/index");

module.exports = {
  index: async (data) => {
    const allLanguage = await model.Language.findAll({});
    if (allLanguage) {
      return {
        allLanguage,
      };
    }
    return {
      error: "Cannot find resouces",
    };
  },

  show: async (data) => {
    const { languageId } = data;
    const language = await model.Language.findByPk(languageId);
    if (language) {
      return {
        language,
      };
    }
    return {
      error: "Cannot find resouces",
    };
  },

  create: async (data) => {
    const { name, locale, flag } = data;
    const newLanguage = await model.Language.create({
      name: name,
      locale: locale,
      flag: flag,
      created_at: new Date(),
      updated_at: new Date(),
    });
    if (newLanguage) {
      return {
        newLanguage,
      };
    }
    return {
      error: "Failed to create new language",
    };
  },

  update: async (data) => {
    const { name, locale, flag, languageId } = data;
    const checkLanguage = await model.Language.findOne({
      where: {
        id: languageId,
      },
    });
    if (!checkLanguage) {
      return {
        error: "Cannot find resouces",
      };
    }

    const language = await model.Language.update(
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
    if (language) {
      return true;
    }
    return {
      error: "Failed to update language",
    };
  },

  destroy: async (data) => {
    const { languageId } = data;
    const checkLanguage = await model.Language.findOne({
      where: {
        id: languageId,
      },
    });
    if (!checkLanguage) {
      return {
        error: "Cannot find resouces",
      };
    }
    const destroyLanguage = await model.Language.destroy({
      where: {
        id: languageId,
      },
    });
    if (destroyLanguage === 1) {
      return true;
    }
    return {
      error: "Failed to delete language",
    };
  },
};
