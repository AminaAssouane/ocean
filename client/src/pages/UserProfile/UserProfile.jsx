import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import PostPreview from "../../components/PostPreview/PostPreview";
import FollowButton from "../../components/FollowButton/FollowButton";
import styles from "./UserProfile.module.css";
import { CalendarDays } from "lucide-react";

export default function UserProfile() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [following, setFollowing] = useState(null);
  const [followers, setFollowers] = useState(null);
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    async function getUserData() {
      try {
        const res = await api.get(`/users/${userId}`);
        setUser(res.data);

        const followingRes = await api.get(`/followers/${userId}/following`);
        setFollowing(followingRes.data.count);

        const followersRes = await api.get(`/followers/${userId}`);
        setFollowers(followersRes.data.count);

        const postsRes = await api.get(`/dashboard/user/${userId}`);
        setPosts(postsRes.data);
      } catch (error) {
        console.error("Failed to fetch profile data. ", error);
      }
    }
    getUserData();
  }, []);

  if (!user || following === null || followers === null || posts === null)
    return <p>Loading...</p>;

  return (
    <section>
      <div className={styles.coverContainer}>
        <img src={user.cover} alt="" className={styles.cover} />
        <img src={user.avatar} alt="" className={styles.avatar} />
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.userAndFollow}>
          <div className={styles.username}>{user.username}</div>
          <FollowButton userId={userId} className={styles.followButton} />
        </div>
        <div className={styles.date}>
          <div>
            <CalendarDays className={styles.dateIcon} />
          </div>{" "}
          <div>
            Joined{" "}
            {new Date(user.createdAt).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </div>
        </div>
        <div className={styles.followInfo}>
          <div className={styles.following}>
            <span className={styles.followNumber}>{following}</span>{" "}
            <span className={styles.follow}>Following</span>
          </div>
          <div className={styles.followers}>
            <span className={styles.followNumber}>{followers}</span>{" "}
            <span className={styles.follow}>Followers</span>
          </div>
        </div>
      </div>
      <div className={styles.postsContainer}>
        {posts.map((post) => (
          <PostPreview key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
