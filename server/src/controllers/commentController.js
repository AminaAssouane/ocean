const prisma = require("../lib/prisma");

async function getNbComments(req, res) {
  const postId = parseInt(req.params.id);
  try {
    const comments = await prisma.comment.findMany({
      where: { postId },
    });
    res.json(comments.length);
  } catch (error) {
    console.error("Failed fetching comments. ", error);
    res.status(500).json({ message: "Failed fetching comments." });
  }
}

async function getComments(req, res) {
  const postId = parseInt(req.params.id);
  try {
    const comments = await prisma.comment.findMany({
      where: { postId },
      include: { user: { select: { id: true, username: true, avatar: true } } },
      orderBy: { createdAt: "desc" },
    });
    res.json(comments);
  } catch (error) {
    console.error("Failed fetching comments. ", error);
    res.status(500).json({ message: "Failed fetching comments." });
  }
}

async function createComment(req, res) {
  try {
    const content = req.body.content;
    const postId = parseInt(req.params.id);
    const userId = parseInt(req.user.id);
    const comment = await prisma.comment.create({
      data: { content, postId, userId },
    });
    res.json(comment);
  } catch (error) {
    console.error("Failed creating comment. ", error);
    res.status(500).json({ message: "Failed creating comment." });
  }
}

async function deleteComment(req, res) {
  try {
    const id = parseInt(req.params.id);
    const comment = await prisma.comment.delete({ where: { id } });
    res.json(comment);
  } catch (error) {
    console.error("Failed deleting comment. ", error);
    res.status(500).json({ message: "Failed deleting comment." });
  }
}

module.exports = { getNbComments, getComments, createComment, deleteComment };
