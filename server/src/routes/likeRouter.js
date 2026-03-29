const likeRouter = require("express").Router();
const likeController = require("../controllers/likeController");

likeRouter.get("/", likeController.getLikedPosts);
likeRouter.get("/:id", likeController.isLiked);
likeRouter.post("/:id", likeController.like);
likeRouter.delete("/:id", likeController.dislike);
likeRouter.get("/:id/nb", likeController.getNbLikes);

module.exports = likeRouter;
