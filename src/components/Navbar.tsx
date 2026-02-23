"use client";
import { useState, useEffect } from "react";

const links = ["About", "Skills", "Experience", "Projects"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "20px 60px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backdropFilter: "blur(20px)",
        background: scrolled ? "rgba(8,8,16,0.95)" : "rgba(8,8,16,0.6)",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
        transition: "all 0.3s ease",
      }}
    >
      {/* Logo */}
      <div
        style={{
          fontFamily: "var(--font-syne)",
          fontWeight: 800,
          fontSize: "1.3rem",
          background: "linear-gradient(135deg, var(--c1), var(--c5))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        NS
      </div>

      {/* Links */}
      <ul style={{ display: "flex", gap: "36px", listStyle: "none" }}>
        {links.map((link) => (
          <li key={link}>
            <a
              href={`#${link.toLowerCase()}`}
              style={{
                color: "var(--muted)",
                textDecoration: "none",
                fontSize: "0.9rem",
                fontWeight: 500,
                letterSpacing: "0.02em",
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
            >
              {link}
            </a>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href="mailto:nikitasurani16@gmail.com"
        style={{
          padding: "10px 24px",
          background: "linear-gradient(135deg, var(--c1), var(--c5))",
          color: "white",
          borderRadius: "10px",
          fontSize: "0.85rem",
          fontWeight: 500,
          textDecoration: "none",
          transition: "opacity 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
      >
        Hire Me
      </a>
    </nav>
  );
}