import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import Recommendations from "../../components/Recommendations/Recommendations";
import styles from "./DashboardLayout.module.css";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
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
    </div>
  );
}
