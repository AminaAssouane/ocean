import { useEffect, useState } from "react";
import api from "../../services/api";

export default function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    async function fetchComments() {
      try {
        const res = await api.get(`/comments/${postId}`);
        setComments(res.data);
      } catch (error) {
        console.error("Failed fetching comments. ", error);
      }
    }
    fetchComments();
  }, []);

  async function handlePost(e) {
    e.stopPropagation();
    try {
      await api.post(`/comments/${postId}`, { content });
      setContent("");
    } catch (error) {
      console.error("Failed creating comment. ", error);
    }
  }

  return (
    <section>
      <textarea
        name=""
        id=""
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onClick={(e) => e.stopPropagation()}
      ></textarea>
      <button onClick={handlePost}>Post</button>
      {comments.map((comment) => (
        <div key={comment.id}>{comment.content}</div>
      ))}
    </section>
  );
}
