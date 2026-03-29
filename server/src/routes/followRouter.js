const followRouter = require("express").Router();
const followController = require("../controllers/followController");
const authMiddleware = require("../middleware/authMiddleware");

followRouter.get("/:id", authMiddleware, followController.getFollowers);
followRouter.get(
  "/:id/following",
  authMiddleware,
  followController.getFollowing,
);
followRouter.post("/:id", authMiddleware, followController.follow);
followRouter.delete("/:id", authMiddleware, followController.unfollow);
followRouter.get(
  "/:id/isfollowed",
  authMiddleware,
  followController.isFollowed,
);

module.exports = followRouter;
