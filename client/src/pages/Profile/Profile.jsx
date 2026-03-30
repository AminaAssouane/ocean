import { useEffect, useState } from "react";
import api from "../../services/api";
import styles from "./Profile.module.css";
import avatar from "../../assets/images/ProfilePic.png";
import cover from "../../assets/images/ocean-cover.jpg";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [following, setFollowing] = useState(null);
  const [followers, setFollowers] = useState(null);

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
      } catch (error) {
        console.error("Failed to fetch profile data. ", error);
      }
    }
    getProfileData();
  }, []);

  if (!user || following === null || followers === null)
    return <p>Loading...</p>;

  return (
    <section>
      <div>
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
            <div className={styles.following}>{following} Following</div>
            <div className={styles.followers}>{followers} Followers</div>
          </div>
        </div>
      </div>
    </section>
  );
}
