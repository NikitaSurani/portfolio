"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Load saved theme
    const saved = localStorage.getItem("theme");
    if (saved === "light") {
      setIsDark(false);
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, []);

  const toggle = () => {
    const newTheme = isDark ? "light" : "dark";
    setIsDark(!isDark);
    if (newTheme === "light") {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    localStorage.setItem("theme", newTheme);
  };

  return (
    <button
      onClick={toggle}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      style={{
        width: "42px",
        height: "42px",
        borderRadius: "12px",
        background: "var(--card)",
        border: "1px solid var(--border)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.1rem",
        transition: "border-color 0.2s, background 0.2s, transform 0.2s",
        flexShrink: 0,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
        e.currentTarget.style.transform = "scale(1.05)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border)";
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      {isDark ? "☀️" : "🌙"}
    </button>
  );
}