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
    <section
      ref={sectionRef}
      id="skills"
      style={{ padding: "100px 60px", background: "var(--surface)" }}
    >
      <style>{`
        .reveal { opacity: 0; transform: translateY(40px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .reveal.visible { opacity: 1; transform: translateY(0); }
      `}</style>

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
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "20px",
        }}
      >
        {skills.map((skill, i) => {
          const c = colorMap[skill.color] || colorMap.c1;
          return (
            <div
              key={skill.id}
              className="reveal"
              style={{ transitionDelay: `${i * 80}ms` }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "translateY(-4px)";
                el.style.borderColor = c.border;
                el.style.boxShadow = c.shadow;
                (el.querySelector(".top-bar") as HTMLElement).style.opacity = "1";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "translateY(0)";
                el.style.borderColor = "var(--border)";
                el.style.boxShadow = "none";
                (el.querySelector(".top-bar") as HTMLElement).style.opacity = "0";
              }}
            >
              <div
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "16px",
                  padding: "28px",
                  transition: "transform 0.3s, border-color 0.3s, box-shadow 0.3s",
                  position: "relative",
                  overflow: "hidden",
                  cursor: "default",
                }}
              >
                {/* Top color bar */}
                <div
                  className="top-bar"
                  style={{
                    position: "absolute",
                    top: 0, left: 0, right: 0,
                    height: "2px",
                    background: c.bar,
                    opacity: 0,
                    transition: "opacity 0.3s",
                  }}
                />
                <div
                  style={{
                    width: "44px", height: "44px",
                    borderRadius: "10px",
                    background: c.iconBg,
                    display: "flex", alignItems: "center", justifyContent: "center",
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
  );
}