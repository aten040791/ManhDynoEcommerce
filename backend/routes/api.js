require("express-router-group");
const express = require("express");
const postsController = require("modules/post/controllers/postsController");
const authController = require("modules/auth/controllers/authController");
const languagesController = require("modules/languages/controllers/languageController");
const categoriesController = require("modules/category/controllers/categoryController");
const usersController = require("modules/user/controllers/userController");
const { role } = require("middlewares/roleMiddleware");
const authenticated = require("middlewares/authMiddleware");
const { validate } = require("kernels/validations");
const registerRequest = require("modules/auth/requests/registerRequest");
const loginRequest = require("modules/auth/requests/loginRequest");
const recoverPasswordRequest = require("modules/auth/requests/recoverPasswordRequest");
const middlewares = require("kernels/middlewares");
const resetPasswordRequest = require("modules/auth/requests/resetPasswordRequest");
const createLanguageRequest = require("modules/languages/requests/createLanguageRequest");
const updateLanguageRequest = require("modules/languages/requests/updateLanguageRequest");
// const detailPostRequest = require("modules/post/requests/detailPostRequest");
const createPostRequest = require("modules/post/requests/createPostRequest");
const router = express.Router({ mergeParams: true });

router.group("/auth", (router) => {
  router.post("/sign-in", validate([loginRequest]), authController.signIn);
  router.post("/sign-up", validate([registerRequest]), authController.signUp);
  router.post(
    "/recover-password",
    validate([recoverPasswordRequest]),
    authController.recoverPassword
  );
  router.put(
    "/reset-password",
    validate([resetPasswordRequest]),
    authController.resetPassword
  );
});

router.group("/posts", (router) => {
  router.get("/", postsController.index);
  // router.get("/:postId", validate([detailPostRequest]), postsController.show);
  router.get("/:postId", postsController.show);
});

router.group(
  "/posts",
  middlewares([authenticated, role("owner")]),
  (router) => {
    router.post(
      "/create",
      validate([createPostRequest]),
      postsController.create
    );
    router.put("/update/:postId", postsController.update);
    router.delete("/delete/:postId", postsController.destroy);
  }
);

router.group(
  "/languages",
  middlewares([authenticated, role("admin")]),
  (router) => {
    router.get("/", languagesController.index);
    router.get("/:languageId", languagesController.show);
    router.post(
      "/create",
      validate([createLanguageRequest]),
      languagesController.create
    );
    router.put(
      "/update/:languageId",
      validate([updateLanguageRequest]),
      languagesController.update
    );
    router.delete("/delete/:languageId", languagesController.destroy);
  }
);

router.group("/categories", middlewares([role("admin")]), (router) => {
  router.get("/", categoriesController.index);
  router.get("/:categoryId", categoriesController.show);
  router.post("/create", categoriesController.create);
  router.put("/update/:categoryId", categoriesController.update);
  router.delete("/delete/:categoryId", categoriesController.destroy);
});

router.group("/users", middlewares([role("admin")]), (router) => {
  router.get("/", usersController.index);
  router.delete("/delete/:userId", usersController.destroy);
});

module.exports = router;
