import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
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
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
