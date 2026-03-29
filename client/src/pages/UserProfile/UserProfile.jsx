import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import FollowButton from "../../components/FollowButton/FollowButton";

export default function UserProfile() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [followed, setFollowed] = useState(null);

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

  useEffect(() => {
    async function isFollowed() {
      try {
        const isFollowed = await api.get(`/followers/${userId}/isfollowed`);
        setFollowed(isFollowed);
      } catch (error) {
        console.error("Failed to check if user is followed of not. ", error);
      }
    }
    isFollowed();
  }, []);

  if (!user) return <p>Loading user...</p>;
  if (!followed) return <p>Loading follow...</p>;

  return (
    <section>
      <div>
        {user.username}{" "}
        <FollowButton userId={userId} initialFollowing={followed} />
      </div>
    </section>
  );
}
