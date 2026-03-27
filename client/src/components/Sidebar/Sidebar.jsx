import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";
import {
  House,
  CircleUser,
  SquarePlus,
  Users,
  Heart,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className={styles.sideBarContainer}>
      <NavLink
        to="/dashboard"
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
        <Users /> Users
      </NavLink>
      <NavLink
        to="/dashboard/liked"
        className={({ isActive }) =>
          isActive ? styles.active : styles.navLink
        }
      >
        <Heart /> Likes
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? styles.active : styles.navLink
        }
      >
        <LogOut />
        Logout
      </NavLink>
    </aside>
  );
}
