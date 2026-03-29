const { Router } = require("express");
const commentRouter = Router();
const commentController = require("../controllers/commentController");

commentRouter.get("/:id", commentController.getComments);
commentRouter.post("/:id", commentController.createComment);

module.exports = commentRouter;
