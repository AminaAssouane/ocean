import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function LoginForm({ onSwitch }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      await api.post("/login", { username, password });
      navigate("/register");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <button>Guest User</button>
      <p>
        Don't have an account? <a onClick={onSwitch}>Sign up!</a>
      </p>
    </>
  );
}
