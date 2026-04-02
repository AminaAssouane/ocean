import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import Recommendations from "../../components/Recommendations/Recommendations";
import api from "../../services/api";
import styles from "./DashboardLayout.module.css";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { House, CircleUser, UserSearch, Heart, LogOut } from "lucide-react";

export default function DashboardLayout() {
  const navigate = useNavigate();

  async function handleClick() {
    try {
      await api.post("/logout");
      navigate("/");
    } catch (error) {
      console.error("Failed to logout. ", error);
    }
  }

  return (
    <div className={styles.dashboardLayout}>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>
      <div className={styles.recommendations}>
        <Recommendations />
      </div>
      <main className={styles.main}>
        <Outlet />
      </main>

      <nav className={styles.bottomNav}>
        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) =>
            isActive ? styles.active : styles.navLink
          }
        >
          <House />
        </NavLink>
        <NavLink
          to="/dashboard/profile"
          className={({ isActive }) =>
            isActive ? styles.active : styles.navLink
          }
        >
          <CircleUser />
        </NavLink>
        <NavLink
          to="/dashboard/users"
          className={({ isActive }) =>
            isActive ? styles.active : styles.navLink
          }
        >
          <UserSearch />
        </NavLink>
        <NavLink
          to="/dashboard/likes"
          className={({ isActive }) =>
            isActive ? styles.active : styles.navLink
          }
        >
          <Heart />
        </NavLink>
        <LogOut className={styles.logoutBtn} onClick={handleClick} />
      </nav>
    </div>
  );
}
