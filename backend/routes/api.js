require("express-router-group");
const express = require("express");
const authController = require("modules/auth/controllers/authController");
const languagesController = require("modules/languages/controllers/languageController");
const { user, owner, admin } = require("../middlewares/authMiddleware");
const router = express.Router({ mergeParams: true });

router.group("/auth", (router) => {
  router.post("/sign-in", authController.signIn);
  router.post("/sign-up", authController.signUp);
  router.post("/recover-password", authController.recoverPassword);
  router.put("/reset-password", authController.resetPassword);
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

module.exports = router;
