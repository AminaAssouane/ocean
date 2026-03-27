import oceanIcon from "../../assets/icons/ocean.svg";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <div className={styles.header}>
      <img src={oceanIcon} className={styles.oceanIcon} />
      <h1 className={styles.headerTitle}>Ocean</h1>
    </div>
  );
}
