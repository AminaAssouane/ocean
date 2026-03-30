import { useEffect, useState } from "react";
import PostPreview from "../../components/PostPreview/PostPreview";
import api from "../../services/api";
import styles from "./Profile.module.css";
import avatar from "../../assets/images/ProfilePic.png";
import cover from "../../assets/images/ocean-cover.jpg";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [following, setFollowing] = useState(null);
  const [followers, setFollowers] = useState(null);
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    async function getProfileData() {
      try {
        const res = await api.get("/users");
        setUser(res.data);

        const followingRes = await api.get(
          `/followers/${res.data.id}/following`,
        );
        setFollowing(followingRes.data.count);

        const followersRes = await api.get(`/followers/${res.data.id}`);
        setFollowers(followersRes.data.count);

        const postsRes = await api.get(`/dashboard/user/${res.data.id}`);
        setPosts(postsRes.data);
      } catch (error) {
        console.error("Failed to fetch profile data. ", error);
      }
    }
    getProfileData();
  }, []);

  if (!user || following === null || followers === null || posts === null)
    return <p>Loading...</p>;

  return (
    <section>
      <div className={styles.coverContainer}>
        <img src={cover} alt="" className={styles.cover} />
        <img src={avatar} alt="" className={styles.avatar} />
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.username}>{user.username}</div>
        <div className={styles.date}>
          Joined{" "}
          {new Date(user.createdAt).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
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
