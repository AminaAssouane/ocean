import { useState } from "react";
import api from "../../services/api";
import styles from "./Users.module.css";
import FollowButton from "../../components/FollowButton/FollowButton";

export default function Users() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

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
    <div>
      <section className={styles.searchSection}>
        <input type="text" value={query} onChange={handleSearch} />
        <button>Search</button>
      </section>
      <section className={styles.userList}>
        {results.map((user) => (
          <div>
            <div key={user.id}>{user.username}</div> <FollowButton />
          </div>
        ))}
      </section>
    </div>
  );
}
