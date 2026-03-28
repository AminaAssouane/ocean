import { useEffect, useState } from "react";
import api from "../../services/api";

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
      <div>{user.username}</div>
    </section>
  );
}
