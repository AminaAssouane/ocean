import { useState } from "react";
import api from "../../services/api";

export default function FollowButton({ userId, initialFollowing = false }) {
  const [isFollowed, setIsFollowed] = useState(initialFollowing);
  async function handleClick() {
    try {
      if (!isFollowed) {
        await api.post(`/followers/${userId}`);
      } else {
        await api.delete(`/followers/${userId}`);
      }
      setIsFollowed(!isFollowed);
    } catch (error) {
      console.error("Failed to follow user. ", error);
    }
  }

  return (
    <button onClick={handleClick}>{isFollowed ? "Unfollow" : "Follow"}</button>
  );
}
