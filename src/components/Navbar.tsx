"use client";

import { useEffect, useRef, useState } from "react";
import BrandMark from "./BrandMark";

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
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    const onOutsideClick = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      if (
        navRef.current?.contains(target) ||
        mobileMenuRef.current?.contains(target)
      ) {
        return;
      }

      setMenuOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onOutsideClick);
    document.addEventListener("touchstart", onOutsideClick);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onOutsideClick);
      document.removeEventListener("touchstart", onOutsideClick);
    };
  }, [menuOpen]);

  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    const navHeight = navRef.current?.offsetHeight ?? 76;

    if (!target) return;

    const targetTop = target.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: targetTop - navHeight - 8,
      behavior: "smooth",
    });
  };

  const navigateToSection = (
    event: React.MouseEvent<HTMLAnchorElement>,
    id: string,
    closeMenu = false
  ) => {
    event.preventDefault();
    scrollToSection(id);
    if (closeMenu) setMenuOpen(false);
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`site-nav ${scrolled ? "is-scrolled" : ""}`}
        aria-label="Primary"
      >
        <a
          href="#about"
          className="site-nav-brand"
          aria-label="Go to top section"
          onClick={(event) => navigateToSection(event, "about")}
        >
          <BrandMark compact />
        </a>

        <ul className="site-nav-links">
          {links.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className="site-nav-link"
                onClick={(event) => navigateToSection(event, link.id)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="site-nav-actions">
          <a className="site-nav-cta" href="mailto:nikitasurani16@gmail.com">
            Hire Me
          </a>
          <button
            type="button"
            className={`site-nav-toggle ${menuOpen ? "is-open" : ""}`}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setMenuOpen((value) => !value)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div
        ref={mobileMenuRef}
        id="mobile-menu"
        className={`mobile-menu ${menuOpen ? "open" : ""}`}
      >
        {links.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            className="mobile-menu-link"
            onClick={(event) => navigateToSection(event, link.id, true)}
          >
            {link.label}
          </a>
        ))}
        <a className="mobile-menu-cta" href="mailto:nikitasurani16@gmail.com">
          Let&apos;s Work Together
        </a>
      </div>
    </>
  );
}
