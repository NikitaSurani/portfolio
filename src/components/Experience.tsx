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

    sectionRef.current
      ?.querySelectorAll(".reveal")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="section-shell">
      <div className="section-content">
        <div className="section-label">Where I&apos;ve worked</div>
        <h2 className="section-title">
          Work <span className="gradient-text">Experience</span>
        </h2>

        <div className="timeline">
          {experiences.map((exp, index) => (
            <article
              key={exp.id}
              className="reveal panel-card timeline-item"
              style={{ transitionDelay: `${index * 75}ms` }}
            >
              <div className="timeline-dot" style={{ borderColor: exp.color }}>
                <i style={{ background: exp.color }} />
              </div>

              <div className="timeline-head">
                <h3>{exp.title}</h3>
                <span>
                  {exp.start} - {exp.end}
                </span>
              </div>

              <div className="timeline-sub">
                {exp.company} | {exp.location}
              </div>

              <ul>
                {exp.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
