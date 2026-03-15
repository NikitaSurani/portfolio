"use client";
import { useState, useEffect, useRef } from "react";
import ThemeToggle from "./Themetoggle";

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
  const isScrollingRef = useRef(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
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
      const target = e.target as HTMLElement;
      if (target.closest(".nav-modal-backdrop") && !target.closest(".nav-modal-panel")) {
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

  const handleMobileScroll = (e: React.MouseEvent | React.TouchEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    isScrollingRef.current = true;
    const target = document.getElementById(id);
    const navHeight = navRef.current?.offsetHeight ?? 70;
    if (target) {
      const targetTop = target.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: targetTop - navHeight, behavior: "smooth" });
    }
    setTimeout(() => {
      setMenuOpen(false);
      isScrollingRef.current = false;
    }, 150);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <style>{`
        /* Floating pill navbar container */
        .navbar { padding: 12px 20px; }
        .navbar-inner {
          max-width: 960px;
          margin: 0 auto;
          padding: 12px 24px;
          border-radius: 100px;
          background: var(--card);
          border: 1px solid var(--border);
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255,255,255,0.03);
          transition: box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .navbar.scrolled .navbar-inner {
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255,255,255,0.04);
        }
        .nav-link {
          color: var(--muted);
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
          letter-spacing: 0.02em;
          padding: 8px 14px;
          border-radius: 100px;
          transition: color 0.2s, background 0.2s, outline-offset 0.2s;
        }
        .nav-link:hover { color: var(--text); background: rgba(255,255,255,0.06); }
        .nav-link:focus-visible { outline: 2px solid var(--c4); outline-offset: 2px; color: var(--text); }
        .navbar-hire-link {
          padding: 10px 22px;
          background: linear-gradient(135deg, var(--c1), var(--c5));
          color: white;
          border-radius: 100px;
          font-size: 0.85rem;
          font-weight: 600;
          text-decoration: none;
          transition: transform 0.2s, box-shadow 0.2s, outline-offset 0.2s;
          box-shadow: 0 2px 12px rgba(255, 107, 107, 0.25);
        }
        .navbar-hire-link:hover { transform: translateY(-1px); box-shadow: 0 4px 20px rgba(255, 107, 107, 0.35); }
        .navbar-hire-link:focus-visible { outline: 2px solid var(--c4); outline-offset: 2px; }
        .mobile-menu-btn {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: rgba(255,255,255,0.06);
          border: 1px solid var(--border);
          border-radius: 12px;
          cursor: pointer;
          padding: 10px;
          align-items: center;
          justify-content: center;
          transition: background 0.2s, border-color 0.2s;
        }
        .mobile-menu-btn:hover { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.12); }
        .mobile-menu-btn:focus-visible { outline: 2px solid var(--c4); outline-offset: 2px; }

        /* Mobile modal: backdrop */
        .nav-modal-backdrop {
          display: none;
          position: fixed;
          inset: 0;
          z-index: 200;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(8px);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .nav-modal-backdrop.open {
          opacity: 1;
        }
        /* Mobile modal: panel */
        .nav-modal-panel {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          width: min(320px, 85vw);
          max-width: 100%;
          z-index: 201;
          background: var(--surface);
          border-left: 1px solid var(--border);
          box-shadow: -8px 0 32px rgba(0, 0, 0, 0.3);
          display: flex;
          flex-direction: column;
          transform: translateX(100%);
          transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .nav-modal-backdrop.open .nav-modal-panel {
          transform: translateX(0);
        }
        .nav-modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 20px 16px;
          border-bottom: 1px solid var(--border);
        }
        .nav-modal-close {
          width: 44px;
          height: 44px;
          border: none;
          background: var(--card);
          border-radius: 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text);
          font-size: 1.25rem;
          transition: background 0.2s, transform 0.2s;
        }
        .nav-modal-close:hover { background: rgba(255,255,255,0.08); transform: scale(1.05); }
        .nav-modal-close:focus-visible { outline: 2px solid var(--c4); outline-offset: 2px; }
        .nav-modal-links {
          flex: 1;
          padding: 24px 20px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .nav-modal-links a {
          color: var(--muted);
          text-decoration: none;
          font-size: 1.1rem;
          font-weight: 500;
          padding: 14px 16px;
          border-radius: 12px;
          transition: background 0.2s, color 0.2s;
          display: block;
        }
        .nav-modal-links a {
          opacity: 0;
          transform: translateX(12px);
        }
        .nav-modal-backdrop.open .nav-modal-links a {
          opacity: 1;
          transform: translateX(0);
        }
        .nav-modal-links a:nth-child(1) { transition: opacity 0.25s ease 0.05s, transform 0.25s ease 0.05s, background 0.2s, color 0.2s; }
        .nav-modal-links a:nth-child(2) { transition: opacity 0.25s ease 0.1s, transform 0.25s ease 0.1s, background 0.2s, color 0.2s; }
        .nav-modal-links a:nth-child(3) { transition: opacity 0.25s ease 0.15s, transform 0.25s ease 0.15s, background 0.2s, color 0.2s; }
        .nav-modal-links a:nth-child(4) { transition: opacity 0.25s ease 0.2s, transform 0.25s ease 0.2s, background 0.2s, color 0.2s; }
        .nav-modal-links a:hover, .nav-modal-links a:focus-visible {
          background: rgba(255,255,255,0.06);
          color: var(--text);
        }
        .nav-modal-links a:focus-visible { outline: none; box-shadow: 0 0 0 2px var(--c4); }
        .nav-modal-footer {
          padding: 20px;
          border-top: 1px solid var(--border);
        }
        .nav-modal-footer .navbar-hire-link { width: 100%; text-align: center; display: block; }

        @media (max-width: 768px) {
          .navbar { padding: 10px 16px; }
          .navbar-inner {
            padding: 12px 16px !important;
            border-radius: 20px;
          }
          .nav-links-desktop { display: none !important; }
          .navbar-hire-link { font-size: 0.8rem; padding: 8px 18px; }
          .mobile-menu-btn { display: flex !important; }
          .nav-modal-backdrop { display: block; pointer-events: none; }
          .nav-modal-backdrop.open { pointer-events: auto; }
        }
        @media (max-width: 480px) {
          .navbar-inner { padding: 10px 14px !important; border-radius: 16px; }
          .nav-modal-panel { width: 100%; max-width: 100%; }
        }
      `}</style>

      <nav
        ref={navRef}
        className={`navbar ${scrolled ? "scrolled" : ""}`}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
        }}
      >
        <div
          className="navbar-inner"
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "16px 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <a
            href="#about"
            className="nav-logo"
            style={{
              fontFamily: "var(--font-syne)",
              fontWeight: 800,
              fontSize: "1.25rem",
              background: "linear-gradient(135deg, var(--c1), var(--c5))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textDecoration: "none",
            }}
          >
            NS
          </a>

          <ul className="nav-links-desktop" style={{ display: "flex", gap: "28px", listStyle: "none" }}>
            {links.map(({ label, id }) => (
              <li key={id}>
                <a href={`#${id}`} className="nav-link">
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <ThemeToggle />
            <a className="navbar-hire-link" href="mailto:nikitasurani16@gmail.com">
              Hire Me
            </a>
            <button
              type="button"
              className="mobile-menu-btn"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <span
                style={{
                  display: "block",
                  width: "22px",
                  height: "2px",
                  background: "var(--text)",
                  borderRadius: "2px",
                  transition: "transform 0.3s, opacity 0.3s",
                  transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none",
                }}
              />
              <span
                style={{
                  display: "block",
                  width: "22px",
                  height: "2px",
                  background: "var(--text)",
                  borderRadius: "2px",
                  transition: "opacity 0.3s",
                  opacity: menuOpen ? 0 : 1,
                }}
              />
              <span
                style={{
                  display: "block",
                  width: "22px",
                  height: "2px",
                  background: "var(--text)",
                  borderRadius: "2px",
                  transition: "transform 0.3s, opacity 0.3s",
                  transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none",
                }}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile modal overlay + panel */}
      <div
        id="mobile-menu"
        className={`nav-modal-backdrop ${menuOpen ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        aria-hidden={!menuOpen}
      >
        <div className="nav-modal-panel">
          <div className="nav-modal-header">
            <span
              style={{
                fontFamily: "var(--font-syne)",
                fontWeight: 800,
                fontSize: "1.2rem",
                background: "linear-gradient(135deg, var(--c1), var(--c5))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Menu
            </span>
            <button
              type="button"
              className="nav-modal-close"
              onClick={closeMenu}
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>
          <nav className="nav-modal-links">
            {links.map(({ label, id }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => handleMobileScroll(e, id)}
                onTouchEnd={(e) => handleMobileScroll(e, id)}
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="nav-modal-footer">
            <a
              className="navbar-hire-link"
              href="mailto:nikitasurani16@gmail.com"
              onClick={closeMenu}
            >
              Hire Me
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
