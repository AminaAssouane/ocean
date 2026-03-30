const followRouter = require("express").Router();
const followController = require("../controllers/followController");
const authMiddleware = require("../middleware/authMiddleware");

followRouter.get(
  "/:id/following",
  authMiddleware,
  followController.getFollowing,
);
followRouter.get(
  "/:id/isfollowed",
  authMiddleware,
  followController.isFollowed,
);
followRouter.get("/:id", authMiddleware, followController.getFollowers);
followRouter.post("/:id", authMiddleware, followController.follow);
followRouter.delete("/:id", authMiddleware, followController.unfollow);

module.exports = followRouter;
