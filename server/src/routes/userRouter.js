const { Router } = require("express");
const userRouter = Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const { upload } = require("../config/cloudinary");

userRouter.get("/", authMiddleware, userController.getMe);
userRouter.get("/search", authMiddleware, userController.searchUser);
userRouter.get("/all", authMiddleware, userController.getAllUsers);
userRouter.get("/:id", authMiddleware, userController.getUserById);
userRouter.patch("/:id", authMiddleware, userController.updateUser);
userRouter.patch(
  "/:id/avatar",
  authMiddleware,
  upload.single("avatar"),
  userController.updateAvatar,
);
userRouter.patch(
  "/:id/cover",
  authMiddleware,
  upload.single("cover"),
  userController.updateCover,
);

module.exports = userRouter;
