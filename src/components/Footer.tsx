"use client";
export default function Footer() {
  return (
    <footer
      style={{
        padding: "40px 60px",
        borderTop: "1px solid var(--border)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "16px",
      }}
    >
      <div
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
        Nikita Surani
      </div>

      <div style={{ color: "var(--muted)", fontSize: "0.85rem" }}>
        © {new Date().getFullYear()} · Built with ❤️ using Next.js
      </div>

      <div style={{ display: "flex", gap: "12px" }}>
        {[
          { label: "in", href: "https://www.linkedin.com/in/nikita-surani/" },
          { label: "@", href: "mailto:nikitasurani16@gmail.com" },
        ].map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            style={{
              width: "38px", height: "38px",
              borderRadius: "10px",
              background: "var(--card)",
              border: "1px solid var(--border)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "var(--muted)",
              textDecoration: "none",
              fontSize: "0.85rem",
              fontWeight: 600,
              transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
              e.currentTarget.style.color = "var(--text)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.color = "var(--muted)";
            }}
          >
            {s.label}
          </a>
        ))}
      </div>
    </footer>
  );
}