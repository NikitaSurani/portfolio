"use client";
import { useEffect, useRef } from "react";
import { experiences } from "@/data/experience";

export default function Experience() {
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
        #experience { overflow-x: visible; }
        .timeline-dot { left: -43px; }
        .exp-card {
          transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
        }
        .exp-item:hover .exp-card {
          border-color: rgba(255,255,255,0.12);
          transform: translateX(4px);
          box-shadow: 0 8px 32px rgba(0,0,0,0.2);
        }
        @media (max-width: 768px) {
          .timeline-dot { left: -30px; }
          .exp-card { padding: 24px !important; }
          .exp-card .exp-title { font-size: 1.05rem !important; }
          .exp-card .exp-meta { font-size: 0.85rem !important; }
          .exp-card li { font-size: 0.85rem !important; }
          .experience-section { padding: 70px 20px !important; }
          .timeline-inner { padding-left: 28px !important; }
        }
        @media (max-width: 480px) {
          .timeline-dot { left: -20px; width: 18px !important; height: 18px !important; top: 32px !important; }
          .experience-section { padding: 60px 16px !important; }
          .experience-section h2 { margin-bottom: 40px !important; }
        }
      `}</style>

      <section
        ref={sectionRef}
        id="experience"
        className="experience-section"
        style={{ padding: "100px 60px" }}
      >
        <div className="section-label">Where I&apos;ve worked</div>
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
          Work <span className="gradient-text">Experience</span>
        </h2>

        <div className="timeline-inner" style={{ position: "relative", paddingLeft: "32px" }}>
          <div
            style={{
              position: "absolute",
              left: 0,
              top: "8px",
              bottom: 0,
              width: "1px",
              background: "linear-gradient(to bottom, var(--c1), var(--c5), transparent)",
            }}
          />

          {experiences.map((exp, i) => (
            <div
              key={exp.id}
              className="reveal exp-item"
              style={{
                position: "relative",
                marginBottom: "40px",
                transitionDelay: `${i * 100}ms`,
              }}
            >
              <div
                className="timeline-dot"
                style={{
                  position: "absolute",
                  left: "-43px",
                  top: "36px",
                  width: "22px",
                  height: "22px",
                  borderRadius: "50%",
                  border: `2px solid ${exp.color}`,
                  background: "var(--bg)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: exp.color,
                  }}
                />
              </div>

              <div
                className="exp-card"
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "20px",
                  padding: "32px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "6px",
                    flexWrap: "wrap",
                    gap: "12px",
                  }}
                >
                  <div
                    className="exp-title"
                    style={{
                      fontFamily: "var(--font-syne)",
                      fontWeight: 700,
                      fontSize: "1.15rem",
                    }}
                  >
                    {exp.title}
                  </div>
                  <div
                    className="exp-date"
                    style={{
                      fontSize: "0.8rem",
                      padding: "4px 14px",
                      borderRadius: "100px",
                      background: "rgba(255,255,255,0.06)",
                      color: "var(--muted)",
                      border: "1px solid var(--border)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {exp.start} – {exp.end}
                  </div>
                </div>

                <div className="exp-meta" style={{ color: "var(--muted)", fontSize: "0.9rem", marginBottom: "16px" }}>
                  {exp.company} · {exp.location}
                </div>

                <ul style={{ listStyle: "none" }}>
                  {exp.points.map((point, j) => (
                    <li
                      key={j}
                      style={{
                        fontSize: "0.88rem",
                        color: "var(--muted)",
                        padding: "5px 0 5px 20px",
                        position: "relative",
                        lineHeight: 1.6,
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          left: 0,
                          color: "var(--c4)",
                          fontSize: "0.8rem",
                        }}
                      >
                        →
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
