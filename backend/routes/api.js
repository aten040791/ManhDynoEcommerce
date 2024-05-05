require("express-router-group");
const express = require("express");
const authController = require("modules/auth/controllers/authController");
// const categoriesController = require("modules/category/controllers/categoriesController");
const postsController = require("modules/post/controllers/postsController");
const languagesController = require("modules/languages/controllers/languageController");
const router = express.Router({ mergeParams: true });

router.group("/auth", (router) => {
  router.post("/create", authController.register);
  router.post("/login", authController.login);
  router.post("/forgot-password", authController.forgotPassword);
});

router.group("/languages", (router) => {
  router.get("/", languagesController.index);
  router.get("/:languageId", languagesController.show);
  router.post("/create", languagesController.create);
  router.put("/:languageId", languagesController.update);
  router.delete("/:languageId", languagesController.destroy);
});

router.group("/posts", (router) => {
  router.get("/", postsController.index);
  router.get("/:postId", postsController.show);
  router.post("/create", postsController.create);
  router.patch("/update/:postId", postsController.update);
  router.delete("/delete/:postId", postsController.destroy);
});

module.exports = router;
