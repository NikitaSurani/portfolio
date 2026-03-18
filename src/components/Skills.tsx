"use client";

import { useEffect, useRef } from "react";
import { skills } from "@/data/skills";

const colorMap: Record<string, { tone: string; bar: string }> = {
  c1: {
    tone: "color-mix(in srgb, var(--accent) 22%, transparent)",
    bar: "linear-gradient(90deg, var(--accent), var(--accent-2))",
  },
  c2: {
    tone: "color-mix(in srgb, var(--accent-2) 22%, transparent)",
    bar: "linear-gradient(90deg, var(--accent-2), var(--accent-3))",
  },
  c3: {
    tone: "color-mix(in srgb, var(--accent-3) 20%, transparent)",
    bar: "linear-gradient(90deg, var(--accent-3), var(--accent-4))",
  },
  c4: {
    tone: "color-mix(in srgb, var(--accent-4) 24%, transparent)",
    bar: "linear-gradient(90deg, var(--accent-4), var(--accent))",
  },
  c5: {
    tone: "color-mix(in srgb, var(--accent-5) 24%, transparent)",
    bar: "linear-gradient(90deg, var(--accent-5), var(--accent-2))",
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

    sectionRef.current
      ?.querySelectorAll(".reveal")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="section-shell section-surface">
      <div className="section-content">
        <div className="section-label">What I know</div>
        <h2 className="section-title">
          Skills and <span className="gradient-text">Technologies</span>
        </h2>

        <div className="cards-grid cards-grid-skills">
          {skills.map((skill, index) => {
            const palette = colorMap[skill.color] || colorMap.c1;
            return (
              <article
                key={skill.id}
                className="reveal panel-card skill-card"
                style={{ transitionDelay: `${index * 55}ms` }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: "0 auto auto 0",
                    width: "100%",
                    height: "3px",
                    background: palette.bar,
                    opacity: 0.9,
                  }}
                />

                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "12px",
                    display: "grid",
                    placeItems: "center",
                    fontSize: "0.9rem",
                    fontWeight: 700,
                    marginBottom: "14px",
                    background: palette.tone,
                    color: "var(--text)",
                  }}
                >
                  {skill.icon}
                </div>

                <h3
                  style={{
                    fontFamily: "var(--font-syne)",
                    fontSize: "1.05rem",
                    marginBottom: "12px",
                  }}
                >
                  {skill.name}
                </h3>

                <div className="chip-wrap">
                  {skill.tags.map((tag) => (
                    <span key={tag} className="chip">
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
