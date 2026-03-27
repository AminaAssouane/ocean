const { Router } = require("express");
const postRouter = Router();
const postController = require("../controllers/postController");

postRouter.get("/dashboard", postController.getPosts);
postRouter.get("/dashboard/post", postController.getPostById);
postRouter.post("/dashboard/createPost", postController.createPost);
postRouter.delete("/dashboard/post", postController.deletePost);

module.exports = postRouter;
