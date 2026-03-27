const { Router } = require("express");
const postRouter = Router();
const postController = require("../controllers/postController");

postRouter.get("/", postController.getPosts);
postRouter.get("/post/:id", postController.getPostById);
postRouter.post("/createPost", postController.createPost);
postRouter.delete("/post/:id", postController.deletePost);

module.exports = postRouter;
