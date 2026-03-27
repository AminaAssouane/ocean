import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import styles from "./LoginForm.module.css";

export default function LoginForm({ onSwitch }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      await api.post("/login", { username, password });
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={styles.loginContainer}>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <input
          type="text"
          id="username"
          placeholder="Username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className={styles.loginBtn}>
          Login
        </button>
      </form>
      <button className={styles.guestBtn}>Guest User</button>
      <p>
        Don't have an account?{" "}
        <a onClick={onSwitch} className={styles.signUpBtn}>
          Sign up!
        </a>
      </p>
    </div>
  );
}
