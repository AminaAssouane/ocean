import { useState, useEffect } from "react";
import { useUser } from "../../context/UserContext.jsx";
import api from "../../services/api";
import styles from "./Recommendations.module.css";
import { Link } from "react-router-dom";
import FollowButton from "../FollowButton/FollowButton";

export default function Recommendations() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { currentUser } = useUser();

  useEffect(() => {
    async function fetchUsers() {
      const res = await api.get(`/users/all?page=${page}`);
      setUsers(res.data.users);
      setTotalPages(res.data.pages);
    }
    fetchUsers();
  }, [page]);

  if (!users) return <div>Loading...</div>;
  return (
    <div className={styles.recsContainer}>
      <h2 className={styles.title}>All users : </h2>
      <div className={styles.userList}>
        {users.map((user) => (
          <div key={user.id} className={styles.user}>
            <Link
              to={
                currentUser?.id === user.id
                  ? `/dashboard/profile`
                  : `/dashboard/users/${user.id}`
              }
              className={styles.username}
            >
              <img src={`${user.avatar}`} alt="" className={styles.avatar} />
              <div>{user.username}</div>
            </Link>
            <FollowButton userId={user.id} className={styles.followButton} />
          </div>
        ))}
      </div>
      <div className={styles.buttons}>
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className={styles.navButton}
        >
          Previous
        </button>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className={styles.navButton}
        >
          Next
        </button>
      </div>
    </div>
  );
}
