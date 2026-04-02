import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext.jsx";
import api from "../../services/api";
import styles from "./CommentSection.module.css";
import { SendHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import DeleteCommentButton from "../DeleteCommentButton/DeleteCommentButton";

export default function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const { currentUser } = useUser();

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
    if (!content.trim()) return;

    const optimisticComment = {
      id: Date.now(),
      content,
      createdAt: new Date().toISOString(),
      user: {
        id: currentUser.id,
        username: currentUser.username,
        avatar: currentUser.avatar,
      },
    };

    setComments([optimisticComment, ...comments]); // ← add immediately
    setContent("");

    try {
      const res = await api.post(`/comments/${postId}`, { content });
      setComments((prev) =>
        prev.map((c) => (c.id === optimisticComment.id ? res.data : c)),
      );
    } catch (error) {
      setComments((prev) => prev.filter((c) => c.id !== optimisticComment.id));
      console.error("Failed creating comment. ", error);
    }
  }

  return (
    <section className={styles.commentsContainer}>
      <div className={styles.commentTextField}>
        <textarea
          name=""
          id=""
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onClick={(e) => e.stopPropagation()}
          className={styles.textarea}
          placeholder="Post your reply"
        ></textarea>
        <button onClick={handlePost} className={styles.postBtn}>
          <SendHorizontal />
        </button>
      </div>
      <div className={styles.commentList}>
        {comments.map((comment) => (
          <div key={comment.id} className={styles.comment}>
            <div className={styles.top}>
              <Link
                to={
                  currentUser?.id === comment.user.id
                    ? `/dashboard/profile`
                    : `/dashboard/users/${comment.user.id}`
                }
                onClick={(e) => e.stopPropagation()}
                className={styles.commentInfo}
              >
                <img
                  src={comment.user.avatar}
                  alt=""
                  className={styles.avatar}
                />
                <div className={styles.username}>{comment.user.username}</div> •
                <div className={styles.date}>
                  {new Date(comment.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
              </Link>
              {currentUser?.id === comment.user.id && (
                <DeleteCommentButton
                  commentId={comment.id}
                  onDelete={(id) =>
                    setComments(comments.filter((p) => p.id !== id))
                  }
                />
              )}
            </div>
            <div className={styles.content}>{comment.content}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
