import { NavLink, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { useUser } from "../../context/UserContext.jsx";
import styles from "./Sidebar.module.css";
import {
  House,
  CircleUser,
  SquarePlus,
  UserSearch,
  Heart,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
  const navigate = useNavigate();
  const { currentUser } = useUser();

  async function handleClick() {
    try {
      await api.post("/logout");
      navigate("/");
    } catch (error) {
      console.error("Failed to logout. ", error);
    }
  }

  return (
    <aside className={styles.sideBarContainer}>
      <NavLink
        to="/dashboard"
        end
        className={({ isActive }) =>
          isActive ? styles.active : styles.navLink
        }
      >
        <House />
        Home
      </NavLink>
      <NavLink
        to="/dashboard/profile"
        className={({ isActive }) =>
          isActive ? styles.active : styles.navLink
        }
      >
        <CircleUser /> Profile
      </NavLink>
      <NavLink
        to="/dashboard/create"
        className={({ isActive }) =>
          isActive ? styles.active : styles.navLink
        }
      >
        <SquarePlus /> Create
      </NavLink>
      <NavLink
        to="/dashboard/users"
        className={({ isActive }) =>
          isActive ? styles.active : styles.navLink
        }
      >
        <UserSearch /> Users
      </NavLink>
      <NavLink
        to="/dashboard/likes"
        className={({ isActive }) =>
          isActive ? styles.active : styles.navLink
        }
      >
        <Heart /> Likes
      </NavLink>

      <div className={styles.logout}>
        <div className={styles.userInfo}>
          <img src={currentUser?.avatar} alt="" className={styles.avatar} />
          <div className={styles.username}>{currentUser?.username}</div>
        </div>
        <LogOut className={styles.logoutBtn} onClick={handleClick} />
      </div>
    </aside>
  );
}
