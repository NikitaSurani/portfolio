"use client";

import BrandMark from "./BrandMark";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <BrandMark compact />

        <div className="site-copy">Built with care using Next.js</div>

        <div className="footer-socials">
          <a
            href="https://www.linkedin.com/in/nikita-surani/"
            target="_blank"
            rel="noreferrer"
            className="social-btn"
            aria-label="Visit Nikita Surani on LinkedIn"
          >
            in
          </a>
          <a
            href="mailto:nikitasurani16@gmail.com"
            className="social-btn"
            aria-label="Email Nikita Surani"
          >
            @
          </a>
        </div>
      </div>
    </footer>
  );
}
