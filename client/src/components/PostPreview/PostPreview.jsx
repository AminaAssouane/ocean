import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./PostPreview.module.css";
import LikeButton from "../LikeButton/LikeButton";
import api from "../../services/api";

export default function PostPreview({ post }) {
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();
  function handleClick() {
    navigate(`/dashboard/post/${post.id}`);
  }
  const authorId = post.authorId;

  useEffect(() => {
    async function isLiked() {
      try {
        const liked = await api.get(`/likes/${post.id}`);
        setIsLiked(liked);
      } catch (error) {
        console.error("Failed to fetch like status of the post. ", error);
      }
    }
    isLiked();
  }, []);

  return (
    <article onClick={handleClick} className={styles.postPreviewContainer}>
      <div className={styles.username}>
        <Link to={`users/${authorId}`} onClick={(e) => e.stopPropagation()}>
          {post.author.username}
        </Link>
      </div>
      <div className={styles.content}>{post.content}</div>
      <LikeButton postId={post.id} initialState={isLiked} />
    </article>
  );
}
