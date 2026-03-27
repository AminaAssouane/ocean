const { Router } = require("express");
const postRouter = Router();
const postController = require("../controllers/postController");

postRouter.get("/dashboard", postController.getPosts);
postRouter.get("/dashboard/post/:id", postController.getPostById);
postRouter.post("/dashboard/createPost", postController.createPost);
postRouter.delete("/dashboard/post/:id", postController.deletePost);

module.exports = postRouter;
