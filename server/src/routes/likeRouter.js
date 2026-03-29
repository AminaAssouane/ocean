const likeRouter = require("express").Router();
const likeController = require("../controllers/likeController");
const authMiddleware = require("../middleware/authMiddleware");

likeRouter.get("/", authMiddleware, likeController.getLikedPosts);
likeRouter.get("/:id/nb", authMiddleware, likeController.getNbLikes);
likeRouter.get("/:id", authMiddleware, likeController.isLiked);
likeRouter.post("/:id", authMiddleware, likeController.like);
likeRouter.delete("/:id", authMiddleware, likeController.dislike);

module.exports = likeRouter;
