require("express-router-group");
const express = require("express");
const postsController = require("modules/post/controllers/postsController");
const authController = require("modules/auth/controllers/authController");
const languagesController = require("modules/languages/controllers/languageController");
const usersController = require("modules/user/controllers/userController");
const { user, owner, admin } = require("../middlewares/authMiddleware");
const router = express.Router({ mergeParams: true });

router.group("/auth", (router) => {
  router.post("/sign-in", authController.signIn);
  router.post("/sign-up", authController.signUp);
  router.post("/recover-password", authController.recoverPassword);
  router.put("/reset-password", authController.resetPassword);
});

router.group("/posts", user, (router) => {
  router.get("/", postsController.index);
  router.get("/:postId", postsController.show);
});

router.group("/posts", owner, (router) => {
  router.post("/create", postsController.create);
  router.put("/update/:postId", postsController.update);
  router.delete("/delete/:postId", postsController.destroy);
});
router.group("/languages", user, (router) => {
  router.get("/", languagesController.index);
  router.get("/:languageId", languagesController.show);
});

router.group("/languages", owner, (router) => {
  router.post("/create", languagesController.create);
  router.put("/update/:languageId", languagesController.update);
  router.delete("/delete/:languageId", languagesController.destroy);
});

router.group("/users", admin ,(router) => {
  router.get("/", usersController.index)
  router.delete("/delete/:userId", usersController.destroy);
});

module.exports = router;
