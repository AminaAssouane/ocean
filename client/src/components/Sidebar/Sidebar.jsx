import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  return (
    <aside className={styles.sideBar}>
      <NavLink to="/dashboard">Home</NavLink>
      <NavLink to="/dashboard/profile">Profile</NavLink>
      <NavLink to="/dashboard/create">Create</NavLink>
      <NavLink to="/dashboard/users">Users</NavLink>
      <NavLink to="/dashboard/liked">Likes</NavLink>
      <NavLink>Logout</NavLink>
    </aside>
  );
}
