require("express-router-group");
const express = require("express");
const authController = require("modules/auth/controllers/authController");
const postsController = require("modules/post/controllers/postsController");
const languagesController = require("modules/languages/controllers/languageController");
const router = express.Router({ mergeParams: true });

router.group("/auth", (router) => {
  router.post("/sign-in", authController.signIn);
  router.post("/sign-up", authController.signUp);
  router.get("/recover-password", authController.recoverPassword);
  router.put("/reset-password", authController.resetPassword);
});

router.group("/languages", (router) => {
  router.get("/", languagesController.index);
  router.get("/:languageId", languagesController.show);
  router.post("/create", languagesController.create);
  router.put("/update/:languageId", languagesController.update);
  router.delete("/delete/:languageId", languagesController.destroy);
});

router.group("/posts", (router) => {
  router.get("/", postsController.index);
  router.get("/:postId", postsController.show);
  router.post("/create", postsController.create);
  router.patch("/update/:postId", postsController.update);
  router.delete("/delete/:postId", postsController.destroy);
});

module.exports = router;
