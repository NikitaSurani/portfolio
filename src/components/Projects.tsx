"use client";

import { useEffect, useRef, useState } from "react";
import { projects } from "@/data/projects";

const badgeStyles: Record<string, { bg: string; color: string; border: string }> = {
  backend: {
    bg: "color-mix(in srgb, var(--accent) 15%, transparent)",
    color: "var(--accent)",
    border: "1px solid color-mix(in srgb, var(--accent) 35%, transparent)",
  },
  frontend: {
    bg: "color-mix(in srgb, var(--accent-2) 15%, transparent)",
    color: "var(--accent-2)",
    border: "1px solid color-mix(in srgb, var(--accent-2) 35%, transparent)",
  },
  fullstack: {
    bg: "color-mix(in srgb, var(--accent-3) 16%, transparent)",
    color: "var(--accent-3)",
    border: "1px solid color-mix(in srgb, var(--accent-3) 36%, transparent)",
  },
};

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

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
    <section
      ref={sectionRef}
      id="projects"
      className="section-shell section-surface"
    >
      <div className="section-content">
        <div className="section-label">What I&apos;ve built</div>
        <h2 className="section-title">
          Featured <span className="gradient-text">Projects</span>
        </h2>

        <div className="cards-grid cards-grid-projects">
          {projects.map((project, index) => {
            const badge = badgeStyles[project.badgeColor] || badgeStyles.backend;
            const maxLength = 170;
            const isLong = project.description.length > maxLength;
            const isExpanded = expanded[project.id];
            const shortText = isLong
              ? `${project.description.slice(0, maxLength).trimEnd()}...`
              : project.description;

            return (
              <article
                key={project.id}
                className="reveal panel-card project-card"
                style={{ transitionDelay: `${index * 45}ms` }}
              >
                <span className="project-num">{project.num}</span>

                <div className="project-badge" style={badge}>
                  {project.badge}
                </div>

                <h3>{project.title}</h3>
                <p>
                  {isLong && !isExpanded ? shortText : project.description}
                  {isLong ? (
                    <button
                      type="button"
                      className="project-expand-btn"
                      onClick={() =>
                        setExpanded((prev) => ({
                          ...prev,
                          [project.id]: !prev[project.id],
                        }))
                      }
                    >
                      {isExpanded ? "show less" : "show more"}
                    </button>
                  ) : null}
                </p>

                <div
                  className="chip-wrap"
                  style={{ marginBottom: project.link ? "16px" : 0 }}
                >
                  {project.tech.map((item) => (
                    <span key={item} className="chip">
                      {item}
                    </span>
                  ))}
                </div>

                {project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="project-link"
                  >
                    Visit Site {"->"}
                  </a>
                ) : null}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
