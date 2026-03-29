import { useState } from "react";
import api from "../../services/api";

export default function LikeButton({ postId, initialState = false }) {
  const [liked, setLiked] = useState(initialState);
  async function handleClick() {
    try {
      if (liked) {
        await api.delete(`likes/${postId}`);
      } else {
        await api.post(`likes/${postId}`);
      }
      setLiked(!liked);
    } catch (error) {
      console.error("Failed to like/dislike post. ", error);
    }
  }

  return <button onClick={handleClick}>{liked ? "dislike" : "like"}</button>;
}
