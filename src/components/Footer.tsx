"use client";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-brand">Nikita Surani</div>

        <div className="site-copy">Built with care using Next.js</div>

        <div style={{ display: "flex", gap: "10px" }}>
          <a
            href="https://www.linkedin.com/in/nikita-surani/"
            target="_blank"
            rel="noreferrer"
            className="social-btn"
          >
            in
          </a>
          <a href="mailto:nikitasurani16@gmail.com" className="social-btn">
            @
          </a>
        </div>
      </div>
    </footer>
  );
}
