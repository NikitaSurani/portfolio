"use client";
import { useEffect, useRef } from "react";

export default function Hero() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (glowRef.current) {
        glowRef.current.style.left = e.clientX + "px";
        glowRef.current.style.top = e.clientY + "px";
      }
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <>
      {/* Cursor Glow */}
      <div
        ref={glowRef}
        style={{
          position: "fixed",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(77,150,255,0.07), transparent 70%)",
          pointerEvents: "none",
          transform: "translate(-50%, -50%)",
          transition: "left 0.3s ease, top 0.3s ease",
          zIndex: 999,
        }}
      />

      <section
        id="about"
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          padding: "120px 60px 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Animated Blobs */}
        {[
          { color: "var(--c1)", top: "-100px", right: "-100px", delay: "0s", size: "500px" },
          { color: "var(--c5)", bottom: "-50px", left: "30%", delay: "3s", size: "400px" },
          { color: "var(--c4)", top: "30%", left: "-50px", delay: "6s", size: "300px" },
        ].map((blob, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: blob.size,
              height: blob.size,
              borderRadius: "50%",
              background: blob.color,
              filter: "blur(80px)",
              opacity: 0.12,
              top: blob.top,
              bottom: (blob as any).bottom,
              left: (blob as any).left,
              right: (blob as any).right,
              animation: `float 8s ease-in-out ${blob.delay} infinite`,
            }}
          />
        ))}

        <style>{`
          @keyframes float {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(30px, -30px) scale(1.05); }
            66% { transform: translate(-20px, 20px) scale(0.95); }
          }
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(0.8); }
          }
        `}</style>

        <div style={{ position: "relative", zIndex: 2, maxWidth: "900px" }}>
          {/* Available Tag */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(255,107,107,0.1)",
              border: "1px solid rgba(255,107,107,0.3)",
              color: "var(--c1)",
              padding: "6px 16px",
              borderRadius: "100px",
              fontSize: "0.8rem",
              fontWeight: 500,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              marginBottom: "28px",
              animation: "fadeUp 0.8s ease both",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                background: "var(--c1)",
                borderRadius: "50%",
                animation: "pulse 2s ease infinite",
              }}
            />
            Available for opportunities
          </div>

          {/* Heading */}
          <h1
            style={{
              fontFamily: "var(--font-syne)",
              fontWeight: 800,
              fontSize: "clamp(3rem, 7vw, 5.5rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              marginBottom: "24px",
              animation: "fadeUp 0.8s ease 0.1s both",
            }}
          >
            Hi, I&apos;m{" "}
            <span className="gradient-text">Nikita Surani</span> 👋
          </h1>

          {/* Description */}
          <p
            style={{
              fontSize: "1.1rem",
              color: "var(--muted)",
              lineHeight: 1.7,
              maxWidth: "560px",
              marginBottom: "40px",
              fontWeight: 300,
              animation: "fadeUp 0.8s ease 0.2s both",
            }}
          >
            Full Stack Developer with 3.5+ years of experience building scalable
            backend systems and modern web applications. Specializing in Node.js,
            NestJS, and cloud platforms.
          </p>

          {/* CTA Buttons */}
          <div
            style={{
              display: "flex",
              gap: "16px",
              flexWrap: "wrap",
              animation: "fadeUp 0.8s ease 0.3s both",
            }}
          >
            <a
              href="#projects"
              style={{
                padding: "14px 32px",
                background: "linear-gradient(135deg, var(--c1), var(--c5))",
                color: "white",
                borderRadius: "12px",
                fontSize: "0.95rem",
                fontWeight: 500,
                textDecoration: "none",
                boxShadow: "0 0 30px rgba(255,107,107,0.3)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 0 50px rgba(255,107,107,0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 0 30px rgba(255,107,107,0.3)";
              }}
            >
              View My Work →
            </a>
            <a
              href="https://www.linkedin.com/in/nikita-surani/"
              target="_blank"
              rel="noreferrer"
              style={{
                padding: "14px 32px",
                background: "transparent",
                color: "var(--text)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                fontSize: "0.95rem",
                fontWeight: 500,
                textDecoration: "none",
                transition: "border-color 0.2s, background 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)";
                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                e.currentTarget.style.background = "transparent";
              }}
            >
              LinkedIn →
            </a>
          </div>

          {/* Stats */}
          <div
            style={{
              display: "flex",
              gap: "48px",
              marginTop: "64px",
              paddingTop: "48px",
              borderTop: "1px solid var(--border)",
              animation: "fadeUp 0.8s ease 0.4s both",
              flexWrap: "wrap",
            }}
          >
            {[
              { num: "3.5+", label: "Years Experience" },
              { num: "10+", label: "Projects Delivered" },
              { num: "5+", label: "Technologies" },
            ].map((stat) => (
              <div key={stat.label}>
                <div
                  style={{
                    fontFamily: "var(--font-syne)",
                    fontSize: "2.2rem",
                    fontWeight: 800,
                    background: "linear-gradient(135deg, var(--c2), var(--c3))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {stat.num}
                </div>
                <div style={{ fontSize: "0.85rem", color: "var(--muted)", marginTop: "2px" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}