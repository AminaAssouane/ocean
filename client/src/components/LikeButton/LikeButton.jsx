import { useState, useEffect } from "react";
import api from "../../services/api";
import { Heart } from "lucide-react";
import styles from "./LikeButton.module.css";

export default function LikeButton({ postId }) {
  const [liked, setLiked] = useState(false);
  const [nbLikes, setNbLikes] = useState(0);

  async function handleClick(e) {
    e.stopPropagation();
    try {
      if (liked) {
        await api.delete(`/likes/${postId}`);
        setLiked(false);
        setNbLikes((prev) => prev - 1);
      } else {
        await api.post(`/likes/${postId}`);
        setLiked(true);
        setNbLikes((prev) => prev + 1);
      }
      setLiked(!liked);
    } catch (error) {
      console.error("Failed to like/dislike post. ", error);
    }
  }

  useEffect(() => {
    async function isLiked() {
      try {
        const res = await api.get(`/likes/${postId}`);
        setLiked(res.data);
        const nbRes = await api.get(`/likes/${postId}/nb`);
        setNbLikes(nbRes.data);
      } catch (error) {
        console.error("Failed to fetch like status of the post. ", error);
      }
    }
    isLiked();
  }, []);

  return (
    <div className={styles.likeSection}>
      <div>
        <Heart
          onClick={handleClick}
          className={liked ? `${styles.likedHeart}` : `${styles.heart}`}
        />
      </div>{" "}
      <div className={liked ? `${styles.likedNb}` : ``}>{nbLikes}</div>
    </div>
  );
}
