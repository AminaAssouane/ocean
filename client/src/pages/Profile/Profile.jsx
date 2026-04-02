import { useEffect, useState, useRef } from "react";
import PostPreview from "../../components/PostPreview/PostPreview";
import api from "../../services/api";
import styles from "./Profile.module.css";
import { CalendarDays, SquarePen } from "lucide-react";
import { RingLoader } from "react-spinners";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [following, setFollowing] = useState(null);
  const [followers, setFollowers] = useState(null);
  const [posts, setPosts] = useState(null);
  const [show, setShow] = useState(false);
  const avatarInputRef = useRef(null);
  const coverInputRef = useRef(null);

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

  async function handleAvatarUpload(e) {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("avatar", file);

    const res = await api.patch(`/users/avatar`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    setUser(res.data);
  }

  async function handleCoverUpload(e) {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("cover", file);

    const res = await api.patch(`/users/cover`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    setUser(res.data);
  }

  async function handleBioUpdate(e) {
    e.preventDefault();
    try {
      const res = await api.patch("/users/bio", { bio: e.target.bio.value });
      setUser(res.data);
    } catch (error) {
      console.error("Failed updating bio", error);
    }
  }

  function showEdit() {
    setShow(!show);
  }

  if (!user || following === null || followers === null || posts === null)
    return (
      <div className={styles.spinner}>
        <RingLoader color="#0f488e" />;
      </div>
    );

  return (
    <section>
      <div className={styles.coverContainer}>
        <img src={user.cover} alt="" className={styles.cover} />
        {show && (
          <button
            className={styles.editCoverBtn}
            onClick={() => coverInputRef.current.click()}
          >
            <SquarePen size={16} />
          </button>
        )}
        <div className={styles.avatarWrapper}>
          <img src={user.avatar} alt="" className={styles.avatar} />
          {show && (
            <button
              className={styles.editAvatarBtn}
              onClick={() => avatarInputRef.current.click()}
            >
              <SquarePen size={14} />
            </button>
          )}
        </div>

        <input
          type="file"
          accept="image/*"
          ref={coverInputRef}
          onChange={handleCoverUpload}
          style={{ display: "none" }}
        />
        <input
          type="file"
          accept="image/*"
          ref={avatarInputRef}
          onChange={handleAvatarUpload}
          style={{ display: "none" }}
        />
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.userAndEdit}>
          <div className={styles.username}>{user.username}</div>
          <button className={styles.editButton} onClick={showEdit}>
            Edit Profile
          </button>
        </div>
        <div className={styles.bio}>
          {!show && <div className={styles.bioContent}>{user.bio}</div>}
          <form
            action=""
            onSubmit={handleBioUpdate}
            style={{ display: show ? "block" : "none" }}
          >
            <div className={styles.inputAndBtn}>
              <input
                type="text"
                className={styles.bioInput}
                name="bio"
                value={user.bio}
                onChange={(e) =>
                  setUser((prev) => ({ ...prev, bio: e.target.value }))
                }
              />
              <button
                className={styles.editBioBtn}
                onClick={() => setShow(false)}
              >
                <SquarePen size={14} />
              </button>
            </div>
          </form>
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
          <PostPreview
            key={post.id}
            post={post}
            onDelete={(id) => setPosts(posts.filter((p) => p.id !== id))}
          />
        ))}
      </div>
    </section>
  );
}
