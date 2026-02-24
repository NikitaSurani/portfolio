"use client";
import { useState, useEffect, useRef } from "react";

const links = ["About", "Skills", "Experience", "Projects"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // close mobile menu when clicking outside of nav/menu
  useEffect(() => {
    if (!menuOpen) return;
    const handleClick = (e: Event) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("touchstart", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("touchstart", handleClick);
    };
  }, [menuOpen]);

  return (
    <>
      <style>{`
        .mobile-menu-btn { display: none; }
        .mobile-menu { display: none; }
        @media (max-width: 768px) {
          .mobile-menu-btn { display: flex !important; }
          .nav-links-desktop { display: none !important; }
          .mobile-menu.open {
            display: flex !important;
            flex-direction: column;
            position: fixed;
            top: 64px; left: 0; right: 0;
            background: rgba(8,8,16,0.98);
            backdrop-filter: blur(20px);
            padding: 20px;
            border-bottom: 1px solid rgba(255,255,255,0.06);
            gap: 4px;
            z-index: 99;
          }
        }
      `}</style>

      <nav
        ref={navRef}
        className="navbar"
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
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

        {/* Desktop Links */}
        <ul className="nav-links-desktop" style={{ display: "flex", gap: "36px", listStyle: "none" }}>
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

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {/* Hire Me Button */}
          <a
            className="navbar-hire"
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

          {/* Hamburger Button */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              display: "none",
              flexDirection: "column",
              gap: "5px",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px",
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: "block",
                  width: "22px",
                  height: "2px",
                  background: "var(--text)",
                  borderRadius: "2px",
                  transition: "all 0.3s",
                  transform:
                    menuOpen && i === 0 ? "rotate(45deg) translate(5px, 5px)" :
                    menuOpen && i === 1 ? "opacity: 0" :
                    menuOpen && i === 2 ? "rotate(-45deg) translate(5px, -5px)" : "none",
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {links.map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            onClick={(e) => {
              e.preventDefault();
              setMenuOpen(false);
              const id = link.toLowerCase();
              setTimeout(() => {
                document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
              }, 150);
            }}
            style={{
              color: "var(--muted)",
              textDecoration: "none",
              fontSize: "1rem",
              fontWeight: 500,
              padding: "12px 16px",
              borderRadius: "10px",
              transition: "background 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.05)";
              e.currentTarget.style.color = "var(--text)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "var(--muted)";
            }}
          >
            {link}
          </a>
        ))}
      </div>
    </>
  );
}