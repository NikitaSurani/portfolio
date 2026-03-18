"use client";

import { useEffect, useRef, useState } from "react";

const links = ["About", "Skills", "Experience", "Projects"];

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

  useEffect(() => {
    if (!menuOpen) return;

    const onOutsideClick = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      if (
        navRef.current &&
        !navRef.current.contains(target) &&
        !mobileMenuRef.current?.contains(target)
      ) {
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

  const closeMenuAndScroll = (
    event: React.MouseEvent<HTMLAnchorElement>,
    link: string
  ) => {
    event.preventDefault();
    const id = link.toLowerCase();
    const target = document.getElementById(id);
    const navHeight = navRef.current?.offsetHeight ?? 72;

    setMenuOpen(false);

    if (!target) return;

    const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
    window.scrollTo({ top, behavior: "smooth" });

    // Fallback for browsers or cases where calculated scrolling may fail
    setTimeout(() => {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  return (
    <>
      <style>{`
        .site-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          transition: all 0.25s ease;
        }

        .site-nav-inner {
          max-width: 1160px;
          margin: 0 auto;
          padding: 20px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }

        .site-nav.scrolled {
          background: color-mix(in srgb, var(--bg) 82%, transparent);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border-strong);
        }

        .nav-links {
          display: flex;
          list-style: none;
          gap: 28px;
        }

        .nav-links a {
          color: var(--muted);
          text-decoration: none;
          font-size: 0.92rem;
          font-weight: 600;
          letter-spacing: 0.01em;
          transition: color 0.2s ease;
        }

        .nav-links a:hover {
          color: var(--text);
        }

        .menu-btn {
          display: none;
          width: 38px;
          height: 38px;
          border: 1px solid var(--border-strong);
          border-radius: 10px;
          background: var(--card);
          color: var(--text);
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .mobile-menu {
          display: none;
        }

        @media (max-width: 860px) {
          .site-nav-inner {
            padding: 16px 18px;
          }

          .nav-links {
            display: none;
          }

          .menu-btn {
            display: inline-flex;
          }

          .mobile-menu.open {
            display: flex;
            flex-direction: column;
            gap: 4px;
            position: fixed;
            top: 64px;
            left: 14px;
            right: 14px;
            z-index: 101;
            padding: 10px;
            border: 1px solid var(--border-strong);
            border-radius: 14px;
            background: color-mix(in srgb, var(--card) 86%, transparent);
            backdrop-filter: blur(10px);
            box-shadow: var(--shadow-lg);
          }

          .mobile-menu a {
            text-decoration: none;
            color: var(--text);
            font-weight: 600;
            font-size: 0.95rem;
            padding: 11px 12px;
            border-radius: 10px;
          }

          .mobile-menu a:hover {
            background: var(--surface);
          }
        }
      `}</style>

      <nav
        ref={navRef}
        className={`site-nav ${scrolled ? "scrolled" : ""}`}
      >
        <div className="site-nav-inner">
          <a
            href="#about"
            style={{
              fontFamily: "var(--font-syne)",
              fontWeight: 700,
              fontSize: "1.2rem",
              letterSpacing: "0.02em",
              textDecoration: "none",
              color: "var(--text)",
            }}
          >
            NS
          </a>

          <ul className="nav-links">
            {links.map((link) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase()}`}
                  onClick={(event) => closeMenuAndScroll(event, link)}
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <a href="mailto:nikitasurani16@gmail.com" className="cta-btn-primary">
              Hire Me
            </a>

            <button
              className="menu-btn"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? "X" : "="}
            </button>
          </div>
        </div>
      </nav>

      <div ref={mobileMenuRef} className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {links.map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            onClick={(event) => closeMenuAndScroll(event, link)}
          >
            {link}
          </a>
        ))}
      </div>
    </>
  );
}
