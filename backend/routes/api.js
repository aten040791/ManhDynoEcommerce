require("express-router-group");
const express = require("express");
const postsController = require("modules/post/controllers/postsController");
const authController = require("modules/auth/controllers/authController");
const { user, owner } = require("../middlewares/authMiddleware");
const router = express.Router({ mergeParams: true });

router.group("/auth", (router) => {
  router.post("/sign-in", authController.signIn);
});

// router.group("/languages", user, (router) => {
//   router.get("/", languagesController.index);
//   router.get("/:languageId", languagesController.show);
// });

// router.group("/languages", owner, (router) => {
//   router.post("/create", postsController.create);
//   router.put("/update/:postId", postsController.update);
//   router.delete("/delete/:postId", postsController.destroy);
// });

// router.group("/categories", user, (router) => {
//   router.get("/", categoriesController.index);
// });

// router.group("/categories", owner, (router) => {
//   router.post("/create", categoriesController.create);
//   router.put("/update/:id", categoriesController.update);
//   router.delete("/delete/:id", categoriesController.destroy);
// });

router.group("/posts", user, (router) => {
  router.get("/", postsController.index);
  router.get("/:postId", postsController.show);
});

router.group("/posts", owner, (router) => {
  router.post("/create", postsController.create);
  router.put("/update/:postId", postsController.update);
  router.delete("/delete/:postId", postsController.destroy);
});

module.exports = router;
