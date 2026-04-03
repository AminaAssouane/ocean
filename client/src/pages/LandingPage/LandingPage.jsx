import { useState } from "react";
import styles from "./LandingPage.module.css";
import landingPic from "../../assets/images/LandingPic.png";
import LoginForm from "../../components/LoginForm/LoginForm";
import RegisterForm from "../../components/RegisterForm/RegisterForm";

export default function LandingPage() {
  const [view, setView] = useState("login");
  const currentYear = new Date().getFullYear()

  return (
    <main className={styles.main}>
      <section className={styles.authSection}>
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
          <div className={styles.credit}>
            © <time dateTime={String(currentYear)}>{currentYear}</time> Made by Amina Assouane
          </div>
          <div className={styles.links}>
            <a href="https://github.com/AminaAssouane"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </a>
            <a
              href="https://www.linkedin.com/in/amina-assouane/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </footer>
      </section>
      <section className={styles.imageSection}>
        <img src={landingPic} alt="Ocean wave illustration" className={styles.landingImage} />
      </section>
    </main>
  );
}
