"use client";
import { useEffect, useRef } from "react";
import { skills } from "@/data/skills";

const colorMap: Record<string, { border: string; shadow: string; iconBg: string; bar: string }> = {
  c1: {
    border: "rgba(255,107,107,0.3)",
    shadow: "0 20px 40px rgba(255,107,107,0.1)",
    iconBg: "rgba(255,107,107,0.15)",
    bar: "linear-gradient(90deg, var(--c1), var(--c2))",
  },
  c2: {
    border: "rgba(77,150,255,0.3)",
    shadow: "0 20px 40px rgba(77,150,255,0.1)",
    iconBg: "rgba(77,150,255,0.15)",
    bar: "linear-gradient(90deg, var(--c4), var(--c5))",
  },
  c3: {
    border: "rgba(107,203,119,0.3)",
    shadow: "0 20px 40px rgba(107,203,119,0.1)",
    iconBg: "rgba(107,203,119,0.15)",
    bar: "linear-gradient(90deg, var(--c3), var(--c4))",
  },
  c4: {
    border: "rgba(199,125,255,0.3)",
    shadow: "0 20px 40px rgba(199,125,255,0.1)",
    iconBg: "rgba(199,125,255,0.15)",
    bar: "linear-gradient(90deg, var(--c5), var(--c1))",
  },
  c5: {
    border: "rgba(255,217,61,0.3)",
    shadow: "0 20px 40px rgba(255,217,61,0.1)",
    iconBg: "rgba(255,217,61,0.15)",
    bar: "linear-gradient(90deg, var(--c2), var(--c3))",
  },
};

export default function Skills() {
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
        .reveal { opacity: 0; transform: translateY(40px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .reveal.visible { opacity: 1; transform: translateY(0); }
        .skill-card-wrapper { transition: transform 0.3s ease; }
        .skill-card-wrapper:hover { transform: translateY(-4px); }
        .skill-card { transition: border-color 0.3s, box-shadow 0.3s; }
        .skill-card .top-bar { transition: opacity 0.3s; }
        .skill-card-wrapper:hover .skill-card { border-color: var(--skill-hover-border); box-shadow: var(--skill-hover-shadow); }
        .skill-card-wrapper:hover .skill-card .top-bar { opacity: 1; }
        @media (max-width: 768px) {
          .skill-card { padding: 20px !important; }
          .skill-icon { width: 40px !important; height: 40px !important; font-size: 1.15rem !important; }
          .skills-section { padding: 70px 20px !important; }
          .skills-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
        }
        @media (max-width: 480px) {
          .skills-section { padding: 60px 16px !important; }
          .skills-section h2 { margin-bottom: 40px !important; }
        }
      `}</style>

      <section
        ref={sectionRef}
        id="skills"
        className="skills-section"
        style={{
          padding: "100px 60px",
          background: "var(--surface)",
        }}
      >
        <div className="section-label">What I know</div>
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
          Skills & <span className="gradient-text">Technologies</span>
        </h2>

        <div
          className="skills-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "20px",
          }}
        >
          {skills.map((skill, i) => {
            const c = colorMap[skill.color] || colorMap.c1;
            return (
              <div
                key={skill.id}
                className="reveal skill-card-wrapper"
                style={{
                  transitionDelay: `${i * 80}ms`,
                  // CSS custom props for hover (set on wrapper so :hover can use them)
                  ["--skill-hover-border" as string]: c.border,
                  ["--skill-hover-shadow" as string]: c.shadow,
                }}
              >
                <div
                  className="skill-card"
                  style={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "16px",
                    padding: "28px",
                    position: "relative",
                    overflow: "hidden",
                    cursor: "default",
                  }}
                >
                  <div
                    className="top-bar"
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "2px",
                      background: c.bar,
                      opacity: 0,
                    }}
                  />
                  <div
                    className="skill-icon"
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "10px",
                      background: c.iconBg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.3rem",
                      marginBottom: "16px",
                    }}
                  >
                    {skill.icon}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-syne)",
                      fontWeight: 700,
                      fontSize: "1rem",
                      marginBottom: "12px",
                    }}
                  >
                    {skill.name}
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {skill.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: "0.75rem",
                          padding: "4px 10px",
                          borderRadius: "100px",
                          background: "rgba(255,255,255,0.06)",
                          color: "var(--muted)",
                          border: "1px solid var(--border)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
