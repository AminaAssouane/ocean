import { useState, useEffect } from "react";
import api from "../../services/api";

export default function Recommendations() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

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
    <div>
      <h3>All users : </h3>
      {users.map((user) => (
        <div key={user.id}>{user.username}</div>
      ))}
      <button disabled={page === 1} onClick={() => setPage(page - 1)}>
        Previous
      </button>
      <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
        Next
      </button>
    </div>
  );
}
