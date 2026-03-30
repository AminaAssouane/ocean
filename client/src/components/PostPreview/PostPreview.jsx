import { useNavigate, Link } from "react-router-dom";
import styles from "./PostPreview.module.css";
import LikeButton from "../LikeButton/LikeButton";
import CommentButton from "../CommentButton/CommentButton";

export default function PostPreview({ post }) {
  const navigate = useNavigate();
  function handleClick() {
    navigate(`/dashboard/post/${post.id}`);
  }
  const authorId = post.authorId;

  return (
    <article onClick={handleClick} className={styles.postPreviewContainer}>
      <div className={styles.username}>
        <Link to={`users/${authorId}`} onClick={(e) => e.stopPropagation()}>
          {post.author.username}
        </Link>
      </div>
      <div className={styles.content}>{post.content}</div>
      <LikeButton postId={post.id} />
      <CommentButton postId={post.id} />
    </article>
  );
}
