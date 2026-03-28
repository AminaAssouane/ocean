import { useState } from "react";
import api from "../../services/api";
import styles from "./Users.module.css";

export default function Users() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  async function handleSearch(e) {
    try {
      setQuery(e.target.value);
      const res = await api.get(`/users/search?username=${query}`);
      setResults(res.data);
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
      <section className={styles.userList}></section>
    </div>
  );
}
