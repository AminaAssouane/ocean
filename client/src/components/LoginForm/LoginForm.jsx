import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import api from "../../services/api";
import styles from "./LoginForm.module.css";

export default function LoginForm({ onSwitch }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loadingAction, setLoadingAction] = useState("");

  const { setCurrentUser } = useUser();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoadingAction("login");

    try {
      await api.post("/login", { username, password });
      const userRes = await api.get("/users");
      setCurrentUser(userRes.data);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingAction("");
    }
  }

  async function handleGuestUser(e) {
    e.preventDefault();
    setLoadingAction("guest");

    try {
      await api.post("/login", {
        username: "Guest User",
        password: "guest",
      });

      const userRes = await api.get("/users");
      setCurrentUser(userRes.data);
      navigate("/dashboard");
    } catch (error) {
      console.error("Could not login with Guest User", error);
    } finally {
      setLoadingAction("");
    }
  }

  const isLoading = loadingAction !== "";

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
          disabled={isLoading}
        />

        <input
          type="password"
          id="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />

        <button type="submit" className={styles.loginBtn} disabled={isLoading}>
          {loadingAction === "login" ? "Loading..." : "Login"}
        </button>
      </form>

      <button
        type="button"
        className={styles.guestBtn}
        onClick={handleGuestUser}
        disabled={isLoading}
      >
        {loadingAction === "guest" ? "Loading..." : "Guest User"}
      </button>

      <p className={styles.proposition}>
        Don't have an account?{" "}
        <a onClick={onSwitch} className={styles.signUpBtn}>
          Sign up!
        </a>
      </p>
    </div>
  );
}
