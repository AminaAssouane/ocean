const { Router } = require("express");
const userRouter = Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

userRouter.get("/", authMiddleware, userController.getMe);
userRouter.get("/:id", authMiddleware, userController.getUserById);
userRouter.patch("/:id", authMiddleware, userController.updateUser);
userRouter.get("/search", authMiddleware, userController.searchUser);

module.exports = userRouter;
