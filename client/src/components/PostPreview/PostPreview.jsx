import { useNavigate } from "react-router-dom";
import styles from "./PostPreview.module.css";

export default function PostPreview({ post }) {
  const navigate = useNavigate();
  function handleClick() {
    navigate(`/dashboard/post/${post.id}`);
  }
  return (
    <article onClick={handleClick} className={styles.postPreviewContainer}>
      <div className={styles.username}>{post.author.username}</div>
      <div className={styles.content}>{post.content}</div>
    </article>
  );
}
