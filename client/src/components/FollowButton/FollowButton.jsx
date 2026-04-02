import { useState, useEffect } from "react";
import api from "../../services/api";
import styles from "./FollowButton.module.css";
import { ClipLoader } from "react-spinners";

export default function FollowButton({ userId }) {
  const [isFollowed, setIsFollowed] = useState(null);
  async function handleClick() {
    try {
      if (!isFollowed) {
        await api.post(`/followers/${userId}`);
      } else {
        await api.delete(`/followers/${userId}`);
      }
      setIsFollowed(!isFollowed);
    } catch (error) {
      console.error("Failed to follow/unfollow user. ", error);
    }
  }

  useEffect(() => {
    async function isFollowed() {
      try {
        const isFollowed = await api.get(`/followers/${userId}/isfollowed`);
        setIsFollowed(isFollowed.data);
      } catch (error) {
        console.error("Failed to check if user is followed of not. ", error);
      }
    }
    isFollowed();
  }, []);

  if (isFollowed === null) return <ClipLoader color="#0f488e" />;

  return (
    <button
      onClick={handleClick}
      className={`${styles.followBtn} ${isFollowed ? styles.unfollow : styles.follow}`}
    >
      {isFollowed ? "Unfollow" : "Follow"}
    </button>
  );
}
