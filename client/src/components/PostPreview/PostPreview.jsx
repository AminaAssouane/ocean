import { useNavigate, Link } from "react-router-dom";
import styles from "./PostPreview.module.css";
import LikeButton from "../LikeButton/LikeButton";
import CommentButton from "../CommentButton/CommentButton";
import { Trash2 } from "lucide-react";

export default function PostPreview({ post }) {
  const navigate = useNavigate();
  function handleClick() {
    navigate(`/dashboard/post/${post.id}`);
  }
  const authorId = post.authorId;

  return (
    <article onClick={handleClick} className={styles.postPreviewContainer}>
      <div className={styles.top}>
        <Link
          to={`users/${authorId}`}
          onClick={(e) => e.stopPropagation()}
          className={styles.userInfo}
        >
          <img src={post.author.avatar} alt="" className={styles.avatar} />
          <div className={styles.username}>{post.author.username}</div> •
          <div className={styles.date}>
            {new Date(post.createdAt).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </div>
        </Link>
        <Trash2 className={styles.trash} />
      </div>
      <div className={styles.content}>{post.content}</div>
      <div className={styles.buttons}>
        <LikeButton postId={post.id} />
        <CommentButton postId={post.id} />
      </div>
    </article>
  );
}
