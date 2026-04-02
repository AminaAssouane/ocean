import { useState } from "react";
import styles from "./LandingPage.module.css";
import landingPic from "../../assets/images/LandingPic.png";
import LoginForm from "../../components/LoginForm/LoginForm";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import ThemeSwitcher from "../../components/ThemeSwitcher/ThemeSwitcher";

export default function LandingPage() {
  const [view, setView] = useState("login");

  return (
    <main className={styles.main}>
      <section className={styles.authSection}>
        <div className={styles.theme}>
          <ThemeSwitcher />
        </div>

        <h1 className={styles.title}>Ocean</h1>

        <div className={styles.form}>
          <p>Dive in</p>
          <p>Please fill in your details below</p>
          {view === "login" ? (
            <LoginForm onSwitch={() => setView("register")} />
          ) : (
            <RegisterForm onSwitch={() => setView("login")} />
          )}
        </div>
        <footer>
          <div className={styles.credit}>© Made by Amina Assouane</div>
          <div className={styles.links}>
            <a href="https://github.com/AminaAssouane" target="_blank">
              Github
            </a>
            <a
              href="https://www.linkedin.com/in/amina-assouane/"
              target="_blank"
            >
              LinkedIn
            </a>
          </div>
        </footer>
      </section>
      <section className={styles.imageSection}>
        <img src={landingPic} alt="" className={styles.landingImage} />
      </section>
    </main>
  );
}
