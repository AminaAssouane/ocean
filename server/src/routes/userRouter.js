const { Router } = require("express");
const userRouter = Router();
const userController = require("../controllers/userController");

userRouter.get("/:id", userController.getUser);
userRouter.update("/:id", userController.updateUser);

module.exports = userRouter;
