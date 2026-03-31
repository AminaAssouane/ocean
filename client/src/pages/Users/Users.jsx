import { useState } from "react";
import api from "../../services/api";
import styles from "./Users.module.css";
import FollowButton from "../../components/FollowButton/FollowButton";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

export default function Users() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  async function handleSearch(e) {
    try {
      setQuery(e.target.value);
      if (e.target.value.length > 0) {
        const res = await api.get(`/users/search?username=${e.target.value}`);
        setResults(res.data);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error("Failed to search for users. ", error);
    }
  }

  return (
    <div className={styles.searchUsersWrapper}>
      <h1 className={styles.title}>Search Users</h1>
      <div className={styles.searchContainer}>
        <section className={styles.searchSection}>
          <Search
            className={`${styles.searchIcon} ${isHovered || isFocused ? styles.searchIconHovered : ""}`}
          />
          <input
            type="text"
            value={query}
            onChange={handleSearch}
            className={styles.input}
            placeholder="Search for users"
            onMouseOver={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </section>
      </div>
      <section className={styles.userList}>
        {results.map((user) => (
          <div key={user.id} className={styles.user}>
            <Link to={`${user.id}`} className={styles.username}>
              <img src={`${user.avatar}`} alt="" className={styles.avatar} />
              <div>{user.username}</div>
            </Link>
            <FollowButton userId={user.id} className={styles.followButton} />
          </div>
        ))}
      </section>
    </div>
  );
}
