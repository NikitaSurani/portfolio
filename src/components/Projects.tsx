"use client";
import { useEffect, useRef } from "react";
import { projects } from "@/data/projects";

const badgeStyles: Record<string, { bg: string; color: string; border: string }> = {
  backend: {
    bg: "rgba(255,107,107,0.15)",
    color: "var(--c1)",
    border: "1px solid rgba(255,107,107,0.3)",
  },
  frontend: {
    bg: "rgba(77,150,255,0.15)",
    color: "var(--c4)",
    border: "1px solid rgba(77,150,255,0.3)",
  },
  fullstack: {
    bg: "rgba(107,203,119,0.15)",
    color: "var(--c3)",
    border: "1px solid rgba(107,203,119,0.3)",
  },
};

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .project-card-wrapper { transition: transform 0.3s ease; }
        .project-card-wrapper:hover { transform: translateY(-6px); }
        .project-card-wrapper:hover .project-card {
          box-shadow: 0 24px 60px rgba(0,0,0,0.35);
          border-color: rgba(255,255,255,0.12);
        }
        .project-link:hover { gap: 10px !important; }
        @media (max-width: 768px) {
          .project-card { padding: 24px !important; }
          .project-bignum { font-size: 2.5rem !important; }
          .projects-section { padding: 70px 20px !important; }
          .projects-grid { grid-template-columns: 1fr !important; gap: 20px !important; }
        }
        @media (max-width: 480px) {
          .projects-section { padding: 60px 16px !important; }
          .projects-section h2 { margin-bottom: 40px !important; }
        }
      `}</style>

      <section
        ref={sectionRef}
        id="projects"
        className="projects-section"
        style={{ padding: "100px 60px", background: "var(--surface)" }}
      >
        <div className="section-label">What I&apos;ve built</div>
        <h2
          style={{
            fontFamily: "var(--font-syne)",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            marginBottom: "60px",
            lineHeight: 1.1,
          }}
        >
          Featured <span className="gradient-text">Projects</span>
        </h2>

        <div
          className="projects-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))",
            gap: "24px",
          }}
        >
          {projects.map((project, i) => {
            const badge = badgeStyles[project.badgeColor] || badgeStyles.backend;
            return (
              <div
                key={project.id}
                className="reveal project-card-wrapper"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div
                  className="project-card"
                  style={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "20px",
                    padding: "32px",
                    transition: "box-shadow 0.3s, border-color 0.3s",
                    position: "relative",
                    overflow: "hidden",
                    height: "100%",
                  }}
                >
                  <div
                    className="project-bignum"
                    style={{
                      fontFamily: "var(--font-syne)",
                      fontSize: "3rem",
                      fontWeight: 800,
                      opacity: 0.06,
                      position: "absolute",
                      top: "16px",
                      right: "24px",
                      lineHeight: 1,
                      userSelect: "none",
                    }}
                  >
                    {project.num}
                  </div>

                  <div
                    style={{
                      display: "inline-block",
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      padding: "4px 12px",
                      borderRadius: "100px",
                      marginBottom: "16px",
                      background: badge.bg,
                      color: badge.color,
                      border: badge.border,
                    }}
                  >
                    {project.badge}
                  </div>

                  <div
                    style={{
                      fontFamily: "var(--font-syne)",
                      fontWeight: 700,
                      fontSize: "1.05rem",
                      marginBottom: "10px",
                      lineHeight: 1.3,
                    }}
                  >
                    {project.title}
                  </div>

                  <p
                    style={{
                      fontSize: "0.85rem",
                      color: "var(--muted)",
                      lineHeight: 1.65,
                      marginBottom: "20px",
                    }}
                  >
                    {project.description}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "6px",
                      marginBottom: project.link ? "20px" : "0",
                    }}
                  >
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        style={{
                          fontSize: "0.72rem",
                          padding: "3px 10px",
                          borderRadius: "100px",
                          background: "rgba(255,255,255,0.05)",
                          color: "var(--muted)",
                          border: "1px solid var(--border)",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="project-link"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        fontSize: "0.82rem",
                        fontWeight: 500,
                        color: "var(--c4)",
                        textDecoration: "none",
                        transition: "gap 0.2s",
                      }}
                    >
                      Visit Site →
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
