require("express-router-group");
const express = require("express");
const postsController = require("modules/post/controllers/postsController");
const authController = require("modules/auth/controllers/authController");
const languagesController = require("modules/languages/controllers/languageController");
const categoriesController = require("modules/category/controllers/categoryController");
const usersController = require("modules/user/controllers/userController");
const { role } = require("middlewares/roleMiddleware");
const authenticated = require("middlewares/authMiddleware");
const router = express.Router({ mergeParams: true });

router.group("/auth", (router) => {
  router.post("/sign-in", authController.signIn);
  router.post("/sign-up", authController.signUp);
  router.post("/recover-password", authController.recoverPassword);
  router.put("/reset-password", authController.resetPassword);
});

router.group("/posts", [authenticated, role('owner')], (router) => {
  router.get("/", postsController.index);
  router.get("/:postId", postsController.show);
});

router.group("/posts", [role('owner')], (router) => {
  router.post("/create", postsController.create);
  router.put("/update/:postId", postsController.update);
  router.delete("/delete/:postId", postsController.destroy);
});

router.group("/languages", [role('admin')], (router) => {
  router.get("/", languagesController.index);
  router.get("/:languageId", languagesController.show);
});

router.group("/languages", [role('admin')], (router) => {
  router.post("/create", languagesController.create);
  router.put("/update/:languageId", languagesController.update);
  router.delete("/delete/:languageId", languagesController.destroy);
});

router.group("/categories", [role('admin')], (router) => {
  router.get("/", categoriesController.index);
  router.get("/:categoryId", categoriesController.show);
  router.post("/create", categoriesController.create);
  router.put("/update/:categoryId", categoriesController.update);
  router.delete("/delete/:categoryId", categoriesController.destroy);
});

router.group("/users", [role('admin')] ,(router) => {
  router.get("/", usersController.index)
  router.delete("/delete/:userId", usersController.destroy);
});

module.exports = router;
