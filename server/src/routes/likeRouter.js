const likeRouter = require("express").Router();
const likeController = require("../controllers/likeController");

likeRouter.get("/", likeController.getLikedPosts);
likeRouter.post("/:id", likeController.like);
likeRouter.delete("/:id", likeController.unlike);
likeRouter.get("/:id/nb", likeController.getNbLikes);

module.exports = likeRouter;
