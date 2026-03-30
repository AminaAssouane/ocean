import { useState, useEffect } from "react";
import api from "../../services/api";

export default function LikeButton({ postId }) {
  const [liked, setLiked] = useState(false);

  async function handleClick(e) {
    e.stopPropagation();
    try {
      if (liked) {
        await api.delete(`/likes/${postId}`);
      } else {
        await api.post(`/likes/${postId}`);
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
      } catch (error) {
        console.error("Failed to fetch like status of the post. ", error);
      }
    }
    isLiked();
  }, []);

  return <button onClick={handleClick}>{liked ? "dislike" : "like"}</button>;
}
