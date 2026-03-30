import { useEffect, useState } from "react";
import api from "../../services/api";
import styles from "./Profile.module.css";
import avatar from "../../assets/images/ProfilePic.png";
import cover from "../../assets/images/ocean-cover.jpg";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getSelf() {
      try {
        const res = await api.get("/users");
        setUser(res.data);
      } catch (error) {
        console.error("Failed to fetch user. ", error);
      }
    }
    getSelf();
  }, []);

  if (!user) return <p>Loading...</p>;

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
        </div>
      </div>
    </section>
  );
}
