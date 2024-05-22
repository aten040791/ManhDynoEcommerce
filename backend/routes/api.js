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
const deleteUserRequest = require("modules/user/requests/deleteUserRequest");
const createCategoryRequest = require("modules/category/requests/createCategoryRequest");
const deleteCategoryRequest = require("modules/category/requests/deleteCategoryRequest");
const showCategoryRequest = require("modules/category/requests/showCategoryRequest");
const updateCategoryRequest = require("modules/category/requests/updateCategoryRequest");
const createLanguageRequest = require("modules/languages/requests/createLanguageRequest");
const updateLanguageRequest = require("modules/languages/requests/updateLanguageRequest");
const router = express.Router({ mergeParams: true });

router.group("/auth", (router) => {
  router.post("/sign-in", validate([loginRequest]), authController.signIn);
  router.post("/sign-up", validate([registerRequest]), authController.signUp);
  router.post("/recover-password",validate([recoverPasswordRequest]),authController.recoverPassword);
  router.put("/reset-password",validate([resetPasswordRequest]),authController.resetPassword);
});

router.group("/posts",middlewares([authenticated, role("owner")]),(router) => {
    router.post("/create",validate([createPostRequest]),postsController.create);
    router.put("/update/:postId",validate([updatePostRequest]),postsController.update);
    router.delete("/delete/:postId", postsController.destroy);
  }
);

router.group("/languages",middlewares([authenticated, role("admin")]),(router) => {
    router.get("/", languagesController.index);
    router.get("/:languageId", languagesController.show);
    router.post("/create",validate([createLanguageRequest]),languagesController.create);
    router.put("/update/:languageId",validate([updateLanguageRequest]),languagesController.update);
    router.delete("/delete/:languageId", languagesController.destroy);
  }
);

router.group("/categories", middlewares([authenticated,role("admin")]), (router) => {
  router.get("/", categoriesController.index);
  router.get("/:id", validate([showCategoryRequest]), categoriesController.show);
  router.post("/create", validate([createCategoryRequest]), categoriesController.create);
  router.put("/update/:id", validate([updateCategoryRequest]), categoriesController.update);
  router.delete("/delete/:id", validate([deleteCategoryRequest]), categoriesController.destroy);
});

router.group("/users", middlewares([authenticated, role("admin")]) ,(router) => {
  router.get("/", usersController.index)
  router.delete("/delete/:userId", validate([deleteUserRequest]), usersController.destroy);
});

module.exports = router;
