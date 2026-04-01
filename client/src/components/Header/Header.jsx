import oceanIcon from "../../assets/icons/ocean.svg";
import styles from "./Header.module.css";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";

export default function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.headerLeft}>
        <img src={oceanIcon} className={styles.oceanIcon} />
        <h1 className={styles.headerTitle}>Ocean</h1>
      </div>
      <ThemeSwitcher />
    </div>
  );
}
