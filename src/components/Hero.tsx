"use client";

import { useEffect, useRef } from "react";

type Blob = {
  color: string;
  size: string;
  delay: string;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
};

const blobs: Blob[] = [
  { color: "var(--accent)", size: "360px", delay: "0s", top: "-110px", right: "-120px" },
  { color: "var(--accent-2)", size: "280px", delay: "1.8s", bottom: "-70px", left: "20%" },
  { color: "var(--accent-3)", size: "260px", delay: "3.2s", top: "38%", left: "-100px" },
];

export default function Hero() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (window.innerWidth < 768) return;
      if (!glowRef.current) return;
      glowRef.current.style.left = `${event.clientX}px`;
      glowRef.current.style.top = `${event.clientY}px`;
    };

    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <>
      <style>{`
        @keyframes floatBlob {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(18px, -20px); }
        }

        @keyframes revealUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: 132px 22px 84px;
          overflow: hidden;
        }

        .hero-content {
          width: 100%;
          position: relative;
          z-index: 2;
        }

        .hero-chip,
        .hero-title,
        .hero-copy,
        .hero-actions,
        .hero-stats {
          animation: revealUp 0.7s ease both;
        }

        .hero-title { animation-delay: 0.08s; }
        .hero-copy { animation-delay: 0.16s; }
        .hero-actions { animation-delay: 0.24s; }
        .hero-stats { animation-delay: 0.32s; }

        .hero-chip {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 26px;
          padding: 7px 14px;
          border-radius: 999px;
          border: 1px solid color-mix(in srgb, var(--accent) 45%, transparent);
          background: color-mix(in srgb, var(--accent) 14%, transparent);
          color: var(--accent);
          text-transform: uppercase;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.08em;
        }

        .hero-chip i {
          width: 7px;
          height: 7px;
          border-radius: 999px;
          background: var(--accent);
          box-shadow: 0 0 0 6px color-mix(in srgb, var(--accent) 30%, transparent);
        }

        .hero-title {
          font-family: var(--font-syne);
          font-size: clamp(2.3rem, 7vw, 5rem);
          line-height: 1.06;
          letter-spacing: -0.03em;
          margin-bottom: 20px;
        }

        .hero-copy {
          max-width: 720px;
          color: var(--muted);
          font-size: clamp(1rem, 2vw, 1.12rem);
          line-height: 1.75;
          margin-bottom: 34px;
          text-wrap: balance;
        }

        .hero-actions {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
        }

        .hero-stats {
          margin-top: 56px;
          padding-top: 36px;
          border-top: 1px solid var(--border-strong);
          display: flex;
          flex-wrap: wrap;
          gap: 24px;
        }

        .hero-stat {
          min-width: 160px;
        }

        .hero-stat strong {
          display: block;
          font-family: var(--font-syne);
          font-size: 2rem;
          letter-spacing: -0.02em;
        }

        .hero-stat span {
          font-size: 0.86rem;
          color: var(--muted);
        }

        @media (max-width: 1024px) {
          .hero {
            padding-left: 18px;
            padding-right: 18px;
          }
        }

        @media (max-width: 768px) {
          .hero {
            min-height: auto;
            padding: 118px 14px 64px;
          }

          .hero-actions {
            flex-direction: column;
          }

          .hero-actions a {
            width: 100%;
            text-align: center;
          }

          .hero-stats {
            gap: 18px;
          }

          .hero-stat {
            min-width: calc(50% - 9px);
          }
        }

        @media (max-width: 560px) {
          .hero-title {
            font-size: clamp(2.1rem, 12vw, 3.2rem);
          }

          .hero-copy {
            line-height: 1.65;
          }

          .hero-stat {
            min-width: 100%;
          }
        }
      `}</style>

      <div
        ref={glowRef}
        style={{
          position: "fixed",
          width: "260px",
          height: "260px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--accent-2) 24%, transparent), transparent 72%)",
          pointerEvents: "none",
          transform: "translate(-50%, -50%)",
          transition: "left 0.25s ease, top 0.25s ease",
          zIndex: 0,
        }}
      />

      <section id="about" className="hero">
        {blobs.map((blob) => (
          <div
            key={`${blob.color}-${blob.delay}`}
            style={{
              position: "absolute",
              width: blob.size,
              height: blob.size,
              borderRadius: "50%",
              filter: "blur(76px)",
              opacity: 0.24,
              background: blob.color,
              animation: `floatBlob 8s ease-in-out ${blob.delay} infinite`,
              top: blob.top,
              right: blob.right,
              bottom: blob.bottom,
              left: blob.left,
            }}
          />
        ))}

        <div className="hero-content section-content">
          <div className="hero-chip">
            <i />
            Available for opportunities
          </div>

          <h1 className="hero-title">
            Nikita Surani
            <br />
            <span className="gradient-text">Software Engineer </span>
          </h1>

          <p className="hero-copy">
            Software Engineer with 4+ years of experience building
            production-grade backend systems in NestJS, Node.js, and TypeScript,
            with strong frontend delivery in React.js and Next.js.
          </p>

          <div className="hero-actions">
            <a href="#projects" className="cta-btn-primary">
              View Projects
            </a>
            <a
              href="https://www.linkedin.com/in/nikita-surani/"
              target="_blank"
              rel="noreferrer"
              className="cta-btn-secondary"
            >
              LinkedIn
            </a>
          </div>

          <div className="hero-stats">
            {[
              { value: "4+", label: "Years Experience" },
              { value: "10+", label: "Projects Delivered" },
              { value: "5+", label: "Core Technologies" },
            ].map((item) => (
              <div key={item.label} className="hero-stat">
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
