import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";

export default function UserProfile() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getUserById() {
      try {
        const res = await api.get(`/users/${userId}`);
        setUser(res.data);
      } catch (error) {
        console.error("Failed to fetch user by id. ", error);
      }
    }
    getUserById();
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <section>
      <div>{user.username}</div>
    </section>
  );
}
