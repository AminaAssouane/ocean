import styles from "./ThemeSwitcher.module.css";
import { Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";

export default function ThemeSwitcher({ className }) {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) return savedTheme;

    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    return prefersDark ? "dark" : "light";
  });

  // Apply theme + persist
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className={`${styles.themeSwitcher} ${className || ""}`}>
      <button
        className={`${styles.moon} ${theme === "dark" ? styles.active : ""}`}
        onClick={() => setTheme("dark")}
      >
        <Moon size={20} />
      </button>

      <button
        className={`${styles.sun} ${theme === "light" ? styles.active : ""}`}
        onClick={() => setTheme("light")}
      >
        <Sun size={20} />
      </button>
    </div>
  );
}
