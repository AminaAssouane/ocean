const prisma = require("../lib/prisma");

async function getComments(req, res) {
  const postId = parseInt(req.params.id);
  try {
    const comments = await prisma.comment.findMany({ where: { postId } });
    res.json(comments);
  } catch (error) {
    console.error("Failed fetching comments. ", error);
    res.status(500).json({ message: "Failed fetching comments." });
  }
}

async function createComment(req, res) {
  try {
    const content = req.body.content;
    const comment = await prisma.comment.create({ data: { content } });
    res.json(comment);
  } catch (error) {
    console.error("Failed creating comment. ", error);
    res.status(500).json({ message: "Failed creating comment." });
  }
}

module.exports = { getComments, createComment };
