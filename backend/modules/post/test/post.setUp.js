const model = require("models");
const jwtUtils = require("utils/jwtUtils");

let createdPostId;
let user;
let category;
let language;
let access_token;

const setup = async () => {
  user = await model.User.create({
    email: "manhnguyen1238@gmail.com",
    password: "123456789",
    username: "dinomanh",
    role: "owner",
    created_at: new Date(),
    updated_at: new Date(),
  });

  category = await model.Category.create({
    name: "NodeJS",
    created_at: new Date(),
    updated_at: new Date(),
  });

  language = await model.Language.create({
    name: "English",
    locale: "en_us",
    flag: "Link flag img",
    created_at: new Date(),
    updated_at: new Date(),
  });

  access_token = jwtUtils.sign(user.id, user.role);

  const newPostData = {
    title: "Learn about nodejs for begginer",
    content: "This is content of post learn about nodejs for begginer",
    userId: user.id,
    categoryId: category.id,
    relatedId: 0,
    language: language.locale,
  };

  return { access_token, newPostData, user, category, language };
};

const cleanupPost = async () => {
  if (createdPostId) {
    await model.Post.destroy({ where: { id: createdPostId } });
    createdPostId = null;
  }
};

const cleanupAll = async () => {
  await model.User.destroy({ where: { id: user.id } });
  await model.Category.destroy({ where: { id: category.id } });
  await model.Language.destroy({ where: { id: language.id } });
};

const setCreatedPostId = (id) => {
  createdPostId = id;
};

module.exports = {
  setup,
  cleanupPost,
  cleanupAll,
  setCreatedPostId,
};
