"use client";

import { useEffect, useRef, useState } from "react";

const links = [
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Experience", id: "experience" },
  { label: "Projects", id: "projects" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Body scroll lock when modal is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const handleClick = (e: Event) => {
      if (isScrollingRef.current) return;
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", onOutsideClick);
    document.addEventListener("touchstart", onOutsideClick);
    return () => {
      document.removeEventListener("mousedown", onOutsideClick);
      document.removeEventListener("touchstart", onOutsideClick);
    };
  }, [menuOpen]);

  const handleMobileScroll = (e: React.MouseEvent | React.TouchEvent, link: string) => {
    e.preventDefault();
    e.stopPropagation();
    isScrollingRef.current = true;

    const id = link.toLowerCase();
    const target = document.getElementById(id);
    const navHeight = navRef.current?.offsetHeight ?? 70;

    if (target) {
      const targetTop = target.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: targetTop - navHeight, behavior: "smooth" });
    }

    setTimeout(() => {
      setMenuOpen(false);
      isScrollingRef.current = false;
    }, 100);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <style>{`
        .mobile-menu-btn { display: none; }
        .mobile-menu { display: none; }
        @media (max-width: 768px) {
          .mobile-menu-btn { display: flex !important; }
          .nav-links-desktop { display: none !important; }
          .navbar { padding: 14px 20px !important; }
          .navbar-hire { font-size: 0.8rem !important; padding: 8px 16px !important; }
          .mobile-menu.open {
            display: flex !important;
            flex-direction: column;
            position: fixed;
            top: 64px; left: 0; right: 0;
            background: rgba(8,8,16,0.98);
            backdrop-filter: blur(20px);
            padding: 20px;
            border-bottom: 1px solid var(--border);
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
          borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
          transition: "all 0.3s ease",
        }}
      >
        {/* Logo */}
        <div style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: "1.3rem", background: "linear-gradient(135deg, var(--c1), var(--c5))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
          NS
        </div>

        {/* Desktop Links */}
        <ul className="nav-links-desktop" style={{ display: "flex", gap: "36px", listStyle: "none" }}>
          {links.map((link) => (
            <li key={link}>
              <a href={`#${link.toLowerCase()}`}
                style={{ color: "var(--muted)", textDecoration: "none", fontSize: "0.9rem", fontWeight: 500, letterSpacing: "0.02em", transition: "color 0.3s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {/* Theme Toggle */}
          {/* <ThemeToggle /> */}

          {/* Hire Me */}
          <a className="navbar-hire" href="mailto:nikitasurani16@gmail.com"
            style={{ padding: "10px 24px", background: "linear-gradient(135deg, var(--c1), var(--c5))", color: "white", borderRadius: "10px", fontSize: "0.85rem", fontWeight: 500, textDecoration: "none", transition: "opacity 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Hire Me
          </a>

          {/* Hamburger */}
          <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)}
            style={{ display: "none", flexDirection: "column", gap: "5px", background: "none", border: "none", cursor: "pointer", padding: "4px" }}
          >
            {[0, 1, 2].map((i) => (
              <span key={i} style={{
                display: "block", width: "22px", height: "2px",
                background: "var(--text)", borderRadius: "2px", transition: "all 0.3s",
                transform: menuOpen && i === 0 ? "rotate(45deg) translate(5px, 5px)" : menuOpen && i === 2 ? "rotate(-45deg) translate(5px, -5px)" : "none",
                opacity: menuOpen && i === 1 ? 0 : 1,
              }} />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {links.map((link) => (
          <a key={link} href={`#${link.toLowerCase()}`}
            onClick={(e) => handleMobileScroll(e, link)}
            onTouchEnd={(e) => handleMobileScroll(e, link)}
            style={{ color: "var(--muted)", textDecoration: "none", fontSize: "1rem", fontWeight: 500, padding: "12px 16px", borderRadius: "10px", transition: "background 0.2s, color 0.2s", display: "block" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "var(--text)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--muted)"; }}
          >
            {link}
          </a>
        ))}
      </div>
    </>
  );
}
