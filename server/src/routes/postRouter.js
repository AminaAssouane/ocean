const { Router } = require("express");
const postRouter = Router();
const postController = require("../controllers/postController");
const authMiddleware = require("../middleware/authMiddleware");

postRouter.get("/", authMiddleware, postController.getPosts);
postRouter.get("/post/:id", authMiddleware, postController.getPostById);
postRouter.post("/createPost", authMiddleware, postController.createPost);
postRouter.delete("/post/:id", authMiddleware, postController.removePost);
postRouter.get("/posts/:id", authMiddleware, postController.getPostsOfUser);

module.exports = postRouter;
