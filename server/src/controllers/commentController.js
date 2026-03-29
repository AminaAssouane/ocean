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

module.exports = { getComments };
