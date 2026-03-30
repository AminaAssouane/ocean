const { Router } = require("express");
const commentRouter = Router();
const commentController = require("../controllers/commentController");
const authMiddleware = require("../middleware/authMiddleware");

commentRouter.get("/:id", authMiddleware, commentController.getComments);
commentRouter.post("/:id", authMiddleware, commentController.createComment);

module.exports = commentRouter;
