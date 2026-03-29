const followRouter = require("express").Router();
const followController = require("../controllers/followController");

followRouter.get("/:id", followController.getFollowers);
followRouter.get("/:id/following", followController.getFollowing);
followRouter.post("/:id", followController.follow);
followRouter.delete("/:id", followController.unfollow);
followRouter.get("/:id/isfollowed", followController.isFollowed);

module.exports = followRouter;
